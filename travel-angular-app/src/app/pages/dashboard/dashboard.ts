import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthService } from '../../services/auth.service';
import { BookingService } from '../../services/booking.service';
import { DestinationService } from '../../services/destination.service';

interface ChartData {
  name: string;
  value: number;
}

interface TravelStats {
  totalBookings: number;
  totalSpent: number;
  countriesVisited: number;
  upcomingTrips: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, TranslateModule, NgxChartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  isLoading = signal(false);

  // Travel Statistics
  travelStats = signal<TravelStats>({
    totalBookings: 0,
    totalSpent: 0,
    countriesVisited: 0,
    upcomingTrips: 0
  });

  // Chart Data
  bookingsByType = signal<ChartData[]>([]);
  monthlySpending = signal<ChartData[]>([]);
  topDestinations = signal<ChartData[]>([]);

  // Chart Options
  colorScheme: any = {
    domain: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']
  };

  // Mock data for demonstration
  mockBookingsByType: ChartData[] = [
    { name: 'Flights', value: 12 },
    { name: 'Hotels', value: 8 },
    { name: 'Cars', value: 5 }
  ];

  mockMonthlySpending: ChartData[] = [
    { name: 'Jan', value: 1200 },
    { name: 'Feb', value: 800 },
    { name: 'Mar', value: 1500 },
    { name: 'Apr', value: 2200 },
    { name: 'May', value: 1800 },
    { name: 'Jun', value: 2500 }
  ];

  mockTopDestinations: ChartData[] = [
    { name: 'Paris', value: 3 },
    { name: 'Tokyo', value: 2 },
    { name: 'New York', value: 2 },
    { name: 'London', value: 1 },
    { name: 'Rome', value: 1 }
  ];

  mockTravelStats: TravelStats = {
    totalBookings: 25,
    totalSpent: 12500,
    countriesVisited: 8,
    upcomingTrips: 3
  };

  constructor(
    public authService: AuthService,
    private bookingService: BookingService,
    private destinationService: DestinationService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading.set(true);

    // Simulate API calls with mock data
    setTimeout(() => {
      this.travelStats.set(this.mockTravelStats);
      this.bookingsByType.set(this.mockBookingsByType);
      this.monthlySpending.set(this.mockMonthlySpending);
      this.topDestinations.set(this.mockTopDestinations);
      this.isLoading.set(false);
    }, 1000);

    // In a real application, you would load data from services:
    // this.loadBookingStats();
    // this.loadSpendingData();
    // this.loadDestinationData();
  }

  private loadBookingStats(): void {
    this.bookingService.getUserBookings().subscribe({
      next: (response) => {
        // Process booking data for charts
        console.log('Booking stats loaded:', response);
      },
      error: (error) => {
        console.error('Failed to load booking stats:', error);
      }
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  }

  onChartSelect(event: any): void {
    console.log('Chart item selected:', event);
  }

  onChartActivate(event: any): void {
    console.log('Chart item activated:', event);
  }

  onChartDeactivate(event: any): void {
    console.log('Chart item deactivated:', event);
  }
}
