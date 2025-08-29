import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-destination-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="destination-container">
      <div class="destination-header">
        <h1 class="page-title">Destination Details</h1>
        <p class="page-subtitle">Explore this amazing destination</p>
      </div>
      
      <div class="destination-content">
        <div class="placeholder-content">
          <div class="placeholder-icon">🗺️</div>
          <p>Destination detail page for ID: {{ destinationId }}</p>
          <p>This is a placeholder for the destination detail interface.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .destination-container { padding: 2rem; }
    .destination-header { text-align: center; margin-bottom: 2rem; }
    .page-title { font-size: 2rem; font-weight: 700; color: #1f2937; }
    .page-subtitle { color: #6b7280; }
    .placeholder-content { text-align: center; padding: 3rem; }
    .placeholder-icon { font-size: 4rem; margin-bottom: 1rem; }
    .dark-theme .page-title { color: #ffffff; }
    .dark-theme .page-subtitle { color: #9ca3af; }
  `]
})
export class DestinationDetailComponent {
  destinationId: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.destinationId = this.route.snapshot.paramMap.get('id');
  }
}
