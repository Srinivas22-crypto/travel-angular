import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isOpen" class="modal-overlay" (click)="onOverlayClick($event)">
      <div class="modal-container" [class]="modalSizeClass" (click)="$event.stopPropagation()">
        <div class="modal-header" *ngIf="title || showCloseButton">
          <h2 *ngIf="title" class="modal-title">{{ title }}</h2>
          <button 
            *ngIf="showCloseButton" 
            (click)="onClose()" 
            class="modal-close-button"
            type="button"
          >
            ✕
          </button>
        </div>
        
        <div class="modal-body">
          <ng-content></ng-content>
        </div>
        
        <div class="modal-footer" *ngIf="showFooter">
          <ng-content select="[slot=footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1rem;
      backdrop-filter: blur(4px);
    }

    .modal-container {
      background-color: #ffffff;
      border-radius: 1rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      max-height: 90vh;
      overflow-y: auto;
      animation: modalEnter 0.2s ease-out;
    }

    .dark-theme .modal-container {
      background-color: #1f2937;
    }

    @keyframes modalEnter {
      from {
        opacity: 0;
        transform: scale(0.95) translateY(-10px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .modal-sm { width: 100%; max-width: 400px; }
    .modal-md { width: 100%; max-width: 600px; }
    .modal-lg { width: 100%; max-width: 800px; }
    .modal-xl { width: 100%; max-width: 1200px; }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 1.5rem 0;
      border-bottom: 1px solid #e5e7eb;
      margin-bottom: 1.5rem;
    }

    .dark-theme .modal-header {
      border-bottom-color: #374151;
    }

    .modal-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin: 0;
    }

    .dark-theme .modal-title {
      color: #ffffff;
    }

    .modal-close-button {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #6b7280;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.5rem;
      transition: background-color 0.2s;
    }

    .dark-theme .modal-close-button {
      color: #9ca3af;
    }

    .modal-close-button:hover {
      background-color: #f3f4f6;
    }

    .dark-theme .modal-close-button:hover {
      background-color: #374151;
    }

    .modal-body {
      padding: 0 1.5rem 1.5rem;
    }

    .modal-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid #e5e7eb;
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
    }

    .dark-theme .modal-footer {
      border-top-color: #374151;
    }

    @media (max-width: 640px) {
      .modal-overlay {
        padding: 0.5rem;
      }
      
      .modal-container {
        max-height: 95vh;
      }
      
      .modal-header,
      .modal-body,
      .modal-footer {
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }
  `]
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  @Input() title?: string;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() showCloseButton = true;
  @Input() showFooter = false;
  @Input() closeOnOverlayClick = true;
  @Input() closeOnEscape = true;

  @Output() close = new EventEmitter<void>();
  @Output() open = new EventEmitter<void>();

  get modalSizeClass(): string {
    return `modal-${this.size}`;
  }

  ngOnInit(): void {
    if (this.closeOnEscape) {
      document.addEventListener('keydown', this.handleEscapeKey);
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.handleEscapeKey);
  }

  private handleEscapeKey = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.isOpen) {
      this.close.emit();
    }
  };

  onClose(): void {
    this.close.emit();
  }

  onOverlayClick(event: Event): void {
    if (this.closeOnOverlayClick) {
      this.close.emit();
    }
  }
}
