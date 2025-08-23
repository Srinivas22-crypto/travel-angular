import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast';
import { ToastComponent } from '../toast/toast';

@Component({
  selector: 'app-toast-container',
  imports: [CommonModule, ToastComponent],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.scss'
})
export class ToastContainer {
  constructor(public toastService: ToastService) {}

  onDismiss(id: string): void {
    this.toastService.dismiss(id);
  }
}
