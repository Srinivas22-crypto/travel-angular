import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { 
  Flight, 
  Hotel, 
  Car, 
  Booking,
  FlightSearchParams,
  HotelSearchParams,
  CarSearchParams,
  CreateBookingData,
  BookingSearchParams,
  BookingSearchResponse,
  BOOKING_STATUSES,
  PAYMENT_STATUSES
} from '../models/booking.model';
import { ApiResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly API_BASE_URL = 'http://localhost:5000/api';
  
  // Reactive state using signals
  private bookingsSignal = signal<Booking[]>([]);
  private loadingSignal = signal<boolean>(false);
  private flightsSignal = signal<Flight[]>([]);
  private hotelsSignal = signal<Hotel[]>([]);
  private carsSignal = signal<Car[]>([]);
  
  // Public computed signals
  public bookings = this.bookingsSignal.asReadonly();
  public isLoading = this.loadingSignal.asReadonly();
  public flights = this.flightsSignal.asReadonly();
  public hotels = this.hotelsSignal.asReadonly();
  public cars = this.carsSignal.asReadonly();
  
  // Computed booking statistics
  public bookingStats = computed(() => {
    const bookings = this.bookingsSignal();
    return {
      total: bookings.length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      pending: bookings.filter(b => b.status === 'pending').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
      completed: bookings.filter(b => b.status === 'completed').length
    };
  });

  constructor(private http: HttpClient) {}

  // Flight Services
  searchFlights(params: FlightSearchParams): Observable<{
    outboundFlights: Flight[];
    returnFlights: Flight[];
    searchParams: FlightSearchParams;
  }> {
    this.loadingSignal.set(true);
    
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      const value = params[key as keyof FlightSearchParams];
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, value.toString());
      }
    });

    return this.http.get<any>(`${this.API_BASE_URL}/flights/search`, { params: httpParams })
      .pipe(
        map(response => response.data),
        tap(result => {
          this.flightsSignal.set([...result.outboundFlights, ...result.returnFlights]);
        }),
        catchError(error => {
          const message = error.error?.message || 'Failed to search flights';
          return throwError(() => new Error(message));
        }),
        tap(() => this.loadingSignal.set(false))
      );
  }

  getFlightDeals(limit: number = 10): Observable<Flight[]> {
    return this.http.get<ApiResponse<Flight[]>>(`${this.API_BASE_URL}/flights/deals`, {
      params: { limit: limit.toString() }
    })
      .pipe(
        map(response => response.data),
        catchError(error => {
          const message = error.error?.message || 'Failed to fetch flight deals';
          return throwError(() => new Error(message));
        })
      );
  }

  getFlight(id: string): Observable<Flight> {
    return this.http.get<ApiResponse<Flight>>(`${this.API_BASE_URL}/flights/${id}`)
      .pipe(
        map(response => response.data),
        catchError(error => {
          const message = error.error?.message || 'Failed to fetch flight';
          return throwError(() => new Error(message));
        })
      );
  }

  // Hotel Services
  searchHotels(params: HotelSearchParams): Observable<{
    hotels: Hotel[];
    searchParams: HotelSearchParams;
  }> {
    this.loadingSignal.set(true);
    
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      const value = params[key as keyof HotelSearchParams];
      if (value !== undefined && value !== null) {
        if (typeof value === 'object') {
          httpParams = httpParams.set(key, JSON.stringify(value));
        } else {
          httpParams = httpParams.set(key, value.toString());
        }
      }
    });

    return this.http.get<any>(`${this.API_BASE_URL}/hotels/search`, { params: httpParams })
      .pipe(
        map(response => response.data),
        tap(result => {
          this.hotelsSignal.set(result.hotels);
        }),
        catchError(error => {
          const message = error.error?.message || 'Failed to search hotels';
          return throwError(() => new Error(message));
        }),
        tap(() => this.loadingSignal.set(false))
      );
  }

  getHotelDeals(limit: number = 10): Observable<Hotel[]> {
    return this.http.get<ApiResponse<Hotel[]>>(`${this.API_BASE_URL}/hotels/deals`, {
      params: { limit: limit.toString() }
    })
      .pipe(
        map(response => response.data),
        catchError(error => {
          const message = error.error?.message || 'Failed to fetch hotel deals';
          return throwError(() => new Error(message));
        })
      );
  }

  getHotel(id: string): Observable<Hotel> {
    return this.http.get<ApiResponse<Hotel>>(`${this.API_BASE_URL}/hotels/${id}`)
      .pipe(
        map(response => response.data),
        catchError(error => {
          const message = error.error?.message || 'Failed to fetch hotel';
          return throwError(() => new Error(message));
        })
      );
  }

  // Car Services
  searchCars(params: CarSearchParams): Observable<{
    cars: Car[];
    searchParams: CarSearchParams;
  }> {
    this.loadingSignal.set(true);
    
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      const value = params[key as keyof CarSearchParams];
      if (value !== undefined && value !== null) {
        if (typeof value === 'object') {
          httpParams = httpParams.set(key, JSON.stringify(value));
        } else {
          httpParams = httpParams.set(key, value.toString());
        }
      }
    });

    return this.http.get<any>(`${this.API_BASE_URL}/cars/search`, { params: httpParams })
      .pipe(
        map(response => response.data),
        tap(result => {
          this.carsSignal.set(result.cars);
        }),
        catchError(error => {
          const message = error.error?.message || 'Failed to search cars';
          return throwError(() => new Error(message));
        }),
        tap(() => this.loadingSignal.set(false))
      );
  }

  getCar(id: string): Observable<Car> {
    return this.http.get<ApiResponse<Car>>(`${this.API_BASE_URL}/cars/${id}`)
      .pipe(
        map(response => response.data),
        catchError(error => {
          const message = error.error?.message || 'Failed to fetch car';
          return throwError(() => new Error(message));
        })
      );
  }

  // Booking Services
  createBooking(bookingData: CreateBookingData): Observable<Booking> {
    return this.http.post<ApiResponse<Booking>>(`${this.API_BASE_URL}/bookings`, bookingData)
      .pipe(
        map(response => response.data),
        tap(booking => {
          const currentBookings = this.bookingsSignal();
          this.bookingsSignal.set([booking, ...currentBookings]);
        }),
        catchError(error => {
          const message = error.error?.message || 'Failed to create booking';
          return throwError(() => new Error(message));
        })
      );
  }

  getUserBookings(params?: BookingSearchParams): Observable<BookingSearchResponse> {
    this.loadingSignal.set(true);
    
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof BookingSearchParams];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<ApiResponse<Booking[]>>(`${this.API_BASE_URL}/bookings/my-bookings`, { params: httpParams })
      .pipe(
        map(response => ({
          bookings: response.data,
          total: response.total || 0,
          pagination: response.pagination
        })),
        tap(result => {
          this.bookingsSignal.set(result.bookings);
        }),
        catchError(error => {
          const message = error.error?.message || 'Failed to fetch bookings';
          return throwError(() => new Error(message));
        }),
        tap(() => this.loadingSignal.set(false))
      );
  }

  getBooking(id: string): Observable<Booking> {
    return this.http.get<ApiResponse<Booking>>(`${this.API_BASE_URL}/bookings/${id}`)
      .pipe(
        map(response => response.data),
        catchError(error => {
          const message = error.error?.message || 'Failed to fetch booking';
          return throwError(() => new Error(message));
        })
      );
  }

  updateBooking(id: string, updateData: { specialRequests?: string }): Observable<Booking> {
    return this.http.put<ApiResponse<Booking>>(`${this.API_BASE_URL}/bookings/${id}`, updateData)
      .pipe(
        map(response => response.data),
        tap(updatedBooking => {
          const currentBookings = this.bookingsSignal();
          const updatedBookings = currentBookings.map(booking => 
            booking._id === id ? updatedBooking : booking
          );
          this.bookingsSignal.set(updatedBookings);
        }),
        catchError(error => {
          const message = error.error?.message || 'Failed to update booking';
          return throwError(() => new Error(message));
        })
      );
  }

  cancelBooking(id: string, reason?: string): Observable<Booking> {
    return this.http.put<ApiResponse<Booking>>(`${this.API_BASE_URL}/bookings/${id}/cancel`, { reason })
      .pipe(
        map(response => response.data),
        tap(cancelledBooking => {
          const currentBookings = this.bookingsSignal();
          const updatedBookings = currentBookings.map(booking => 
            booking._id === id ? cancelledBooking : booking
          );
          this.bookingsSignal.set(updatedBookings);
        }),
        catchError(error => {
          const message = error.error?.message || 'Failed to cancel booking';
          return throwError(() => new Error(message));
        })
      );
  }

  // Utility methods
  getBookingStatuses() {
    return BOOKING_STATUSES;
  }

  getPaymentStatuses() {
    return PAYMENT_STATUSES;
  }

  calculateDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  formatBookingReference(reference: string): string {
    return reference.replace(/(.{2})/g, '$1-').slice(0, -1);
  }

  getBookingStatusColor(status: string): string {
    const statusObj = BOOKING_STATUSES.find(s => s.value === status);
    return statusObj?.color || 'text-gray-600';
  }

  getPaymentStatusColor(status: string): string {
    const statusObj = PAYMENT_STATUSES.find(s => s.value === status);
    return statusObj?.color || 'text-gray-600';
  }

  canCancelBooking(booking: Booking): boolean {
    if (booking.status === 'cancelled' || booking.status === 'completed') {
      return false;
    }

    // Check if booking is within cancellation window (e.g., 24 hours before)
    const startDate = new Date(booking.startDate);
    const now = new Date();
    const hoursUntilStart = (startDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    return hoursUntilStart > 24;
  }

  canModifyBooking(booking: Booking): boolean {
    if (booking.status === 'cancelled' || booking.status === 'completed') {
      return false;
    }

    // Check if booking is within modification window (e.g., 48 hours before)
    const startDate = new Date(booking.startDate);
    const now = new Date();
    const hoursUntilStart = (startDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    return hoursUntilStart > 48;
  }
}
