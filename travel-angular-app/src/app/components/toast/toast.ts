import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastMessage } from '../../services/toast';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss'
})
export class ToastComponent {
  @Input() toast!: ToastMessage;
  @Output() dismiss = new EventEmitter<string>();

  onDismiss(): void {
    this.dismiss.emit(this.toast.id);
  }

  onAction(): void {
    if (this.toast.action) {
      this.toast.action.onClick();
      this.onDismiss();
    }
  }

  getToastClasses(): string {
    const baseClasses = 'toast-container';
    const typeClasses = {
      success: 'toast-success',
      error: 'toast-error',
      warning: 'toast-warning',
      info: 'toast-info'
    };

    return `${baseClasses} ${typeClasses[this.toast.type]}`;
  }

  getIconSvg(): string {
    const icons = {
      success: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>`,
      error: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>`,
      warning: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>`,
      info: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>`
    };

    return icons[this.toast.type];
  }
}
