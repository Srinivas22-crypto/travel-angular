import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = signal<ToastMessage[]>([]);

  public readonly toasts$ = this.toasts.asReadonly();

  constructor() { }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  show(toast: Omit<ToastMessage, 'id'>): string {
    const id = this.generateId();
    const newToast: ToastMessage = {
      id,
      duration: 5000, // Default 5 seconds
      ...toast
    };

    this.toasts.update(toasts => [...toasts, newToast]);

    // Auto-remove toast after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, newToast.duration);
    }

    return id;
  }

  success(title: string, description?: string, duration?: number): string {
    return this.show({
      type: 'success',
      title,
      description,
      duration
    });
  }

  error(title: string, description?: string, duration?: number): string {
    return this.show({
      type: 'error',
      title,
      description,
      duration: duration || 7000 // Errors stay longer
    });
  }

  warning(title: string, description?: string, duration?: number): string {
    return this.show({
      type: 'warning',
      title,
      description,
      duration
    });
  }

  info(title: string, description?: string, duration?: number): string {
    return this.show({
      type: 'info',
      title,
      description,
      duration
    });
  }

  dismiss(id: string): void {
    this.toasts.update(toasts => toasts.filter(toast => toast.id !== id));
  }

  dismissAll(): void {
    this.toasts.set([]);
  }
}
