import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BookingService } from '../../services/booking.service';
import { Flight, Hotel, Car, FlightSearchParams, HotelSearchParams, CarSearchParams } from '../../models/booking.model';

@Component({
  selector: 'app-book',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, TranslateModule],
  templateUrl: './book.html',
  styleUrl: './book.scss'
})
export class Book implements OnInit {
  activeTab = signal<'flights' | 'hotels' | 'cars'>('flights');

  // Search forms
  flightSearchForm: FormGroup;
  hotelSearchForm: FormGroup;
  carSearchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public bookingService: BookingService
  ) {
    this.flightSearchForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      departureDate: ['', Validators.required],
      returnDate: [''],
      passengers: [1, [Validators.required, Validators.min(1)]],
      class: ['economy'],
      tripType: ['round-trip']
    });

    this.hotelSearchForm = this.fb.group({
      destination: ['', Validators.required],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]],
      rooms: [1, [Validators.required, Validators.min(1)]]
    });

    this.carSearchForm = this.fb.group({
      location: ['', Validators.required],
      pickupDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      category: ['']
    });
  }

  ngOnInit(): void {
    // Load initial data
    this.loadFlightDeals();
    this.loadHotelDeals();
  }

  setActiveTab(tab: 'flights' | 'hotels' | 'cars'): void {
    this.activeTab.set(tab);
  }

  searchFlights(): void {
    if (this.flightSearchForm.valid) {
      const params: FlightSearchParams = this.flightSearchForm.value;
      this.bookingService.searchFlights(params).subscribe({
        next: (result) => {
          console.log('Flight search results:', result);
          // TODO: Navigate to results page or show results
        },
        error: (error) => {
          console.error('Flight search failed:', error);
          // TODO: Show error toast
        }
      });
    }
  }

  searchHotels(): void {
    if (this.hotelSearchForm.valid) {
      const params: HotelSearchParams = this.hotelSearchForm.value;
      this.bookingService.searchHotels(params).subscribe({
        next: (result) => {
          console.log('Hotel search results:', result);
          // TODO: Navigate to results page or show results
        },
        error: (error) => {
          console.error('Hotel search failed:', error);
          // TODO: Show error toast
        }
      });
    }
  }

  searchCars(): void {
    if (this.carSearchForm.valid) {
      const params: CarSearchParams = this.carSearchForm.value;
      this.bookingService.searchCars(params).subscribe({
        next: (result) => {
          console.log('Car search results:', result);
          // TODO: Navigate to results page or show results
        },
        error: (error) => {
          console.error('Car search failed:', error);
          // TODO: Show error toast
        }
      });
    }
  }

  private loadFlightDeals(): void {
    this.bookingService.getFlightDeals(6).subscribe({
      next: (flights) => {
        console.log('Flight deals loaded:', flights);
      },
      error: (error) => {
        console.error('Failed to load flight deals:', error);
      }
    });
  }

  private loadHotelDeals(): void {
    this.bookingService.getHotelDeals(6).subscribe({
      next: (hotels) => {
        console.log('Hotel deals loaded:', hotels);
      },
      error: (error) => {
        console.error('Failed to load hotel deals:', error);
      }
    });
  }
}
