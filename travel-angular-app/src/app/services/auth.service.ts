import { Injectable, signal, computed, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  ApiResponse
} from '../models/user.model';
import { ToastService } from './toast';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_BASE_URL = environment.apiUrl;
  
  // Reactive state using signals
  private userSignal = signal<User | null>(null);
  private loadingSignal = signal<boolean>(false);
  
  // Public computed signals
  public user = this.userSignal.asReadonly();
  public isLoading = this.loadingSignal.asReadonly();
  public isAuthenticated = computed(() => !!this.userSignal());
  public isAdmin = computed(() => this.userSignal()?.role === 'admin');

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getStoredToken();
      const storedUser = this.getStoredUser();

      if (token && storedUser) {
        this.userSignal.set(storedUser);
        // Verify token is still valid
        this.getCurrentUser().subscribe({
          next: (user) => this.userSignal.set(user),
          error: () => this.logout()
        });
      }
    }
  }

  register(userData: RegisterData): Observable<AuthResponse> {
    this.loadingSignal.set(true);
    
    return this.http.post<AuthResponse>(`${this.API_BASE_URL}/auth/register`, userData)
      .pipe(
        tap(response => {
          if (response.success) {
            this.storeAuthData(response.token, response.data);
            this.userSignal.set(response.data);
            this.toastService.success('Account created!', `Welcome ${response.data.name}! Your account has been created successfully.`);
          }
        }),
        catchError(error => {
          const message = error.error?.message || 'Registration failed';
          return throwError(() => new Error(message));
        }),
        tap(() => this.loadingSignal.set(false))
      );
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    this.loadingSignal.set(true);
    
    return this.http.post<AuthResponse>(`${this.API_BASE_URL}/auth/login`, credentials)
      .pipe(
        tap(response => {
          if (response.success) {
            this.storeAuthData(response.token, response.data);
            this.userSignal.set(response.data);
            this.toastService.success('Welcome back!', `Logged in as ${response.data.name}`);
          }
        }),
        catchError(error => {
          const message = error.error?.message || 'Login failed';
          return throwError(() => new Error(message));
        }),
        tap(() => this.loadingSignal.set(false))
      );
  }

  logout(): Observable<void> {
    this.loadingSignal.set(true);
    
    return this.http.post<void>(`${this.API_BASE_URL}/auth/logout`, {})
      .pipe(
        catchError(error => {
          console.error('Logout API call failed:', error);
          return throwError(() => error);
        }),
        tap(() => {
          this.clearAuthData();
          this.userSignal.set(null);
          this.toastService.info('Logged out', 'You have been successfully logged out.');
          this.router.navigate(['/signin']);
        }),
        tap(() => this.loadingSignal.set(false))
      );
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<ApiResponse<User>>(`${this.API_BASE_URL}/auth/me`)
      .pipe(
        map(response => response.data),
        catchError(error => {
          const message = error.error?.message || 'Failed to get user profile';
          return throwError(() => new Error(message));
        })
      );
  }

  updateProfile(userData: Partial<User>): Observable<User> {
    return this.http.put<ApiResponse<User>>(`${this.API_BASE_URL}/auth/updatedetails`, userData)
      .pipe(
        map(response => response.data),
        tap(user => {
          this.userSignal.set(user);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('user', JSON.stringify(user));
          }
        }),
        catchError(error => {
          const message = error.error?.message || 'Failed to update profile';
          return throwError(() => new Error(message));
        })
      );
  }

  updatePassword(passwordData: { currentPassword: string; newPassword: string }): Observable<AuthResponse> {
    return this.http.put<AuthResponse>(`${this.API_BASE_URL}/auth/updatepassword`, passwordData)
      .pipe(
        tap(response => {
          if (response.success && isPlatformBrowser(this.platformId)) {
            localStorage.setItem(environment.auth.tokenKey, response.token);
          }
        }),
        catchError(error => {
          const message = error.error?.message || 'Failed to update password';
          return throwError(() => new Error(message));
        })
      );
  }

  forgotPassword(email: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.API_BASE_URL}/auth/forgotpassword`, { email })
      .pipe(
        catchError(error => {
          const message = error.error?.message || 'Failed to send reset email';
          return throwError(() => new Error(message));
        })
      );
  }

  resetPassword(token: string, password: string): Observable<AuthResponse> {
    return this.http.put<AuthResponse>(`${this.API_BASE_URL}/auth/resetpassword/${token}`, { password })
      .pipe(
        tap(response => {
          if (response.success) {
            this.storeAuthData(response.token, response.data);
            this.userSignal.set(response.data);
          }
        }),
        catchError(error => {
          const message = error.error?.message || 'Failed to reset password';
          return throwError(() => new Error(message));
        })
      );
  }

  uploadProfileImage(imageFile: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', imageFile);

    const headers = new HttpHeaders();
    // Don't set Content-Type, let the browser set it with boundary for FormData

    return this.http.post<ApiResponse<{ imageUrl: string }>>(
      `${this.API_BASE_URL}/users/upload-profile-image`,
      formData,
      { headers }
    ).pipe(
      map(response => response.data),
      catchError(error => {
        const message = error.error?.message || 'Failed to upload image';
        return throwError(() => new Error(message));
      })
    );
  }

  getStoredUser(): User | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      return null;
    }
  }

  getStoredToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem(environment.auth.tokenKey);
  }

  private storeAuthData(token: string, user: User): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(environment.auth.tokenKey, token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  private clearAuthData(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
}
