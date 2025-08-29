import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [class]="buttonClasses"
      (click)="onClick($event)"
    >
      <span *ngIf="loading" class="loading-spinner"></span>
      <span *ngIf="icon && !loading" class="button-icon">{{ icon }}</span>
      <span class="button-content">
        <ng-content></ng-content>
      </span>
    </button>
  `,
  styles: [`
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-weight: 500;
      border-radius: 0.5rem;
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
    }
    
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    /* Sizes */
    .btn-sm { padding: 0.5rem 1rem; font-size: 0.875rem; }
    .btn-md { padding: 0.75rem 1.5rem; font-size: 1rem; }
    .btn-lg { padding: 1rem 2rem; font-size: 1.125rem; }
    
    /* Variants */
    .btn-primary {
      background-color: #3b82f6;
      color: #ffffff;
    }
    .btn-primary:hover:not(:disabled) {
      background-color: #2563eb;
    }
    
    .btn-secondary {
      background-color: #6b7280;
      color: #ffffff;
    }
    .btn-secondary:hover:not(:disabled) {
      background-color: #4b5563;
    }
    
    .btn-outline {
      background-color: transparent;
      color: #3b82f6;
      border-color: #3b82f6;
    }
    .btn-outline:hover:not(:disabled) {
      background-color: #3b82f6;
      color: #ffffff;
    }
    
    .btn-ghost {
      background-color: transparent;
      color: #6b7280;
    }
    .btn-ghost:hover:not(:disabled) {
      background-color: #f3f4f6;
      color: #374151;
    }
    
    .btn-danger {
      background-color: #dc2626;
      color: #ffffff;
    }
    .btn-danger:hover:not(:disabled) {
      background-color: #b91c1c;
    }
    
    .loading-spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .button-icon {
      font-size: 1.125em;
    }
    
    /* Dark theme */
    .dark-theme .btn-ghost {
      color: #9ca3af;
    }
    .dark-theme .btn-ghost:hover:not(:disabled) {
      background-color: #374151;
      color: #d1d5db;
    }
    
    .dark-theme .btn-outline {
      color: #60a5fa;
      border-color: #60a5fa;
    }
    .dark-theme .btn-outline:hover:not(:disabled) {
      background-color: #60a5fa;
      color: #1f2937;
    }
  `]
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon?: string;
  @Input() fullWidth = false;

  @Output() click = new EventEmitter<Event>();

  get buttonClasses(): string {
    const classes = [
      'btn',
      `btn-${this.variant}`,
      `btn-${this.size}`
    ];

    if (this.fullWidth) {
      classes.push('w-full');
    }

    return classes.join(' ');
  }

  onClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.click.emit(event);
    }
  }
}
