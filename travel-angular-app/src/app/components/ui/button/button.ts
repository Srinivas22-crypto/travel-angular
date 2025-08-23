import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant =
  | 'default'
  | 'hero'
  | 'ocean'
  | 'sunset'
  | 'sky'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';

export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon' | 'hero';

@Component({
  selector: 'ui-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class UiButton {
  @Input() variant: ButtonVariant = 'default';
  @Input() size: ButtonSize = 'default';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() class: string = '';

  @Output() click = new EventEmitter<Event>();

  @HostBinding('class')
  get hostClasses(): string {
    return this.getButtonClasses();
  }

  onClick(event: Event): void {
    if (!this.disabled) {
      this.click.emit(event);
    }
  }

  getButtonClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0';

    const variantClasses = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-ocean hover:shadow-lg',
      hero: 'bg-gradient-hero text-primary-foreground hover:scale-105 shadow-elegant transition-transform',
      ocean: 'bg-gradient-ocean text-primary-foreground hover:bg-primary-light shadow-ocean',
      sunset: 'bg-gradient-sunset text-secondary-foreground hover:bg-secondary/90 shadow-sunset',
      sky: 'bg-gradient-sky text-accent-foreground hover:bg-accent/80',
      success: 'bg-success text-success-foreground hover:bg-success/90',
      warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-card hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline'
    };

    const sizeClasses = {
      default: 'h-11 px-6 py-2',
      sm: 'h-9 rounded-md px-4',
      lg: 'h-13 rounded-lg px-8 text-base',
      icon: 'h-10 w-10',
      hero: 'h-14 px-10 text-lg rounded-xl'
    };

    return `${baseClasses} ${variantClasses[this.variant]} ${sizeClasses[this.size]} ${this.class}`;
  }
}
