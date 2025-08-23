import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class UiCard {
  @Input() class: string = '';

  get cardClasses(): string {
    return `rounded-lg border bg-card text-card-foreground shadow-sm ${this.class}`;
  }
}

@Component({
  selector: 'ui-card-header',
  imports: [CommonModule],
  template: `<div [class]="headerClasses"><ng-content></ng-content></div>`,
  standalone: true
})
export class UiCardHeader {
  @Input() class: string = '';

  get headerClasses(): string {
    return `flex flex-col space-y-1.5 p-6 ${this.class}`;
  }
}

@Component({
  selector: 'ui-card-title',
  imports: [CommonModule],
  template: `<h3 [class]="titleClasses"><ng-content></ng-content></h3>`,
  standalone: true
})
export class UiCardTitle {
  @Input() class: string = '';

  get titleClasses(): string {
    return `text-2xl font-semibold leading-none tracking-tight ${this.class}`;
  }
}

@Component({
  selector: 'ui-card-description',
  imports: [CommonModule],
  template: `<p [class]="descriptionClasses"><ng-content></ng-content></p>`,
  standalone: true
})
export class UiCardDescription {
  @Input() class: string = '';

  get descriptionClasses(): string {
    return `text-sm text-muted-foreground ${this.class}`;
  }
}

@Component({
  selector: 'ui-card-content',
  imports: [CommonModule],
  template: `<div [class]="contentClasses"><ng-content></ng-content></div>`,
  standalone: true
})
export class UiCardContent {
  @Input() class: string = '';

  get contentClasses(): string {
    return `p-6 pt-0 ${this.class}`;
  }
}

@Component({
  selector: 'ui-card-footer',
  imports: [CommonModule],
  template: `<div [class]="footerClasses"><ng-content></ng-content></div>`,
  standalone: true
})
export class UiCardFooter {
  @Input() class: string = '';

  get footerClasses(): string {
    return `flex items-center p-6 pt-0 ${this.class}`;
  }
}
