import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-container" [class]="containerClass">
      <div class="spinner" [class]="spinnerClass"></div>
      <p *ngIf="message" class="spinner-message">{{ message }}</p>
    </div>
  `,
  styles: [`
    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    .spinner-container.fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.9);
      z-index: 9999;
    }

    .dark-theme .spinner-container.fullscreen {
      background-color: rgba(31, 41, 55, 0.9);
    }

    .spinner {
      border-radius: 50%;
      border: 3px solid #e5e7eb;
      border-top: 3px solid #3b82f6;
      animation: spin 1s linear infinite;
    }

    .dark-theme .spinner {
      border-color: #374151;
      border-top-color: #60a5fa;
    }

    .spinner-sm { width: 1rem; height: 1rem; }
    .spinner-md { width: 2rem; height: 2rem; }
    .spinner-lg { width: 3rem; height: 3rem; }
    .spinner-xl { width: 4rem; height: 4rem; }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .spinner-message {
      color: #6b7280;
      font-size: 0.875rem;
      text-align: center;
      margin: 0;
    }

    .dark-theme .spinner-message {
      color: #9ca3af;
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() message?: string;
  @Input() fullscreen = false;

  get containerClass(): string {
    return this.fullscreen ? 'fullscreen' : '';
  }

  get spinnerClass(): string {
    return `spinner-${this.size}`;
  }
}
