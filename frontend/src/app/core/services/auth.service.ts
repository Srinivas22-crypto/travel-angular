import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences?: any;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('currentUser');
    
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        this.currentUserSubject.next(parsedUser);
        this.isAuthenticatedSubject.next(true);
      } catch (error) {
        this.logout();
      }
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/auth/login', credentials).pipe(
      map(response => response.data),
      tap(authData => {
        this.setAuthData(authData);
      })
    );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/auth/register', userData).pipe(
      map(response => response.data),
      tap(authData => {
        this.setAuthData(authData);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/signin']);
  }

  private setAuthData(authData: AuthResponse): void {
    localStorage.setItem('authToken', authData.token);
    localStorage.setItem('currentUser', JSON.stringify(authData.user));
    this.currentUserSubject.next(authData.user);
    this.isAuthenticatedSubject.next(true);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  updateProfile(userData: Partial<User>): Observable<User> {
    return this.apiService.put<User>('/auth/profile', userData).pipe(
      map(response => response.data),
      tap(user => {
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
    );
  }

  refreshToken(): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/auth/refresh', {}).pipe(
      map(response => response.data),
      tap(authData => {
        localStorage.setItem('authToken', authData.token);
      })
    );
  }
}
