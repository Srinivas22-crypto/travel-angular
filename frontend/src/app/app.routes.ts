import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  // Default redirect
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  // Home page (public)
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  
  // Auth routes (only accessible when not logged in)
  {
    path: 'auth',
    canActivate: [GuestGuard],
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      {
        path: 'signin',
        loadComponent: () => import('./features/auth/signin/signin.component').then(m => m.SigninComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
      }
    ]
  },
  
  // Public routes (no authentication required)
  {
    path: 'explore',
    loadComponent: () => import('./features/explore/explore.component').then(m => m.ExploreComponent)
  },
  {
    path: 'community',
    loadComponent: () => import('./features/community/community.component').then(m => m.CommunityComponent)
  },
  
  // Booking routes (public access for browsing, auth required for actual booking)
  {
    path: 'bookings',
    loadChildren: () => import('./features/bookings/bookings.routes').then(m => m.bookingsRoutes)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'notifications',
    canActivate: [AuthGuard],
    loadComponent: () => import('./features/notifications/notifications.component').then(m => m.NotificationsComponent)
  },
  
  // Public routes
  {
    path: 'destination/:id',
    loadComponent: () => import('./features/destination/destination-detail.component').then(m => m.DestinationDetailComponent)
  },
  
  // Error routes
  { path: '404', loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent) },
  { path: '**', redirectTo: '/404' }
];
