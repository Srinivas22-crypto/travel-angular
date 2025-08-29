import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="booking-container">
      <div class="booking-header">
        <h1 class="page-title">Hotel Booking</h1>
        <p class="page-subtitle">Discover and book amazing accommodations worldwide</p>
      </div>
      
      <div class="booking-form">
        <div class="form-section">
          <h2>Search Hotels</h2>
          <p>Redirecting to main booking page...</p>
          <div class="placeholder-content">
            <div class="placeholder-icon">🏨</div>
            <p>Loading hotel search interface...</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .booking-container { padding: 2rem; }
    .booking-header { text-align: center; margin-bottom: 2rem; }
    .page-title { font-size: 2rem; font-weight: 700; color: #1f2937; }
    .page-subtitle { color: #6b7280; }
    .placeholder-content { text-align: center; padding: 3rem; }
    .placeholder-icon { font-size: 4rem; margin-bottom: 1rem; }
    .dark-theme .page-title { color: #ffffff; }
    .dark-theme .page-subtitle { color: #9ca3af; }
  `]
})
export class HotelBookingComponent implements OnInit {
  
  constructor(private router: Router) {}
  
  ngOnInit(): void {
    // Redirect to main booking page with hotels tab active
    this.router.navigate(['/bookings/main'], { 
      queryParams: { tab: 'hotels' } 
    });
  }
}
