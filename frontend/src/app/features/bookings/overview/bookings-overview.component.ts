import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Booking {
  id: string;
  type: 'flight' | 'hotel' | 'car';
  title: string;
  destination: string;
  dates: {
    start: Date;
    end: Date;
  };
  status: 'confirmed' | 'pending' | 'cancelled';
  price: number;
  image: string;
}

@Component({
  selector: 'app-bookings-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bookings-overview.component.html',
  styleUrls: ['./bookings-overview.component.css']
})
export class BookingsOverviewComponent implements OnInit {
  bookings: Booking[] = [];
  upcomingBookings: Booking[] = [];
  pastBookings: Booking[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.isLoading = true;
    
    // Mock data - replace with actual API call
    setTimeout(() => {
      this.bookings = [
        {
          id: '1',
          type: 'flight',
          title: 'Flight to Tokyo',
          destination: 'Tokyo, Japan',
          dates: {
            start: new Date('2024-02-15'),
            end: new Date('2024-02-22')
          },
          status: 'confirmed',
          price: 1299,
          image: '/assets/bookings/tokyo-flight.jpg'
        },
        {
          id: '2',
          type: 'hotel',
          title: 'Luxury Resort Bali',
          destination: 'Bali, Indonesia',
          dates: {
            start: new Date('2024-03-10'),
            end: new Date('2024-03-17')
          },
          status: 'confirmed',
          price: 899,
          image: '/assets/bookings/bali-hotel.jpg'
        }
      ];
      
      this.categorizeBookings();
      this.isLoading = false;
    }, 1000);
  }

  private categorizeBookings(): void {
    const now = new Date();
    this.upcomingBookings = this.bookings.filter(booking => booking.dates.start > now);
    this.pastBookings = this.bookings.filter(booking => booking.dates.end < now);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'confirmed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  }

  getTypeIcon(type: string): string {
    switch (type) {
      case 'flight': return '✈️';
      case 'hotel': return '🏨';
      case 'car': return '🚗';
      default: return '📋';
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }
}
