import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { I18nService } from '../../core/services/i18n.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private lastKey: string = '';
  private lastParams: { [key: string]: string } | undefined;
  private lastValue: string = '';
  private subscription: Subscription;

  constructor(private i18nService: I18nService) {
    this.subscription = this.i18nService.currentLanguage$.subscribe(() => {
      this.lastKey = '';
      this.lastValue = '';
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  transform(key: string, params?: { [key: string]: string }): string {
    if (!key) return '';
    
    // Check if we need to update the translation
    if (key !== this.lastKey || JSON.stringify(params) !== JSON.stringify(this.lastParams)) {
      this.lastKey = key;
      this.lastParams = params;
      this.lastValue = this.i18nService.translate(key, params);
    }
    
    return this.lastValue;
  }
}
