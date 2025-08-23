import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Signin } from './pages/signin/signin';
import { Register } from './pages/register/register';
import { Explore } from './pages/explore/explore';
import { Book } from './pages/book/book';
import { Community } from './pages/community/community';
import { Dashboard } from './pages/dashboard/dashboard';
import { ProfileSettings } from './pages/profile-settings/profile-settings';
import { Payment } from './pages/payment/payment';
import { NotFound } from './pages/not-found/not-found';
import { AuthGuard, GuestGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'signin', component: Signin, canActivate: [GuestGuard] },
  { path: 'register', component: Register, canActivate: [GuestGuard] },
  { path: 'explore', component: Explore },
  { path: 'book', component: Book },
  { path: 'community', component: Community },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileSettings, canActivate: [AuthGuard] },
  { path: 'payment', component: Payment, canActivate: [AuthGuard] },
  { path: '404', component: NotFound },
  { path: '**', redirectTo: '404' }
];
