import { Routes } from '@angular/router';

export const bookingsRoutes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    loadComponent: () => import('./overview/bookings-overview.component').then(m => m.BookingsOverviewComponent)
  },
  {
    path: 'flights',
    loadComponent: () => import('./flights/flight-booking.component').then(m => m.FlightBookingComponent)
  },
  {
    path: 'hotels',
    loadComponent: () => import('./hotels/hotel-booking.component').then(m => m.HotelBookingComponent)
  },
  {
    path: 'cars',
    loadComponent: () => import('./cars/car-booking.component').then(m => m.CarBookingComponent)
  }
];
