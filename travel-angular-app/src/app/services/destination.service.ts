import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { 
  Destination, 
  DestinationSearchParams, 
  DestinationSearchResponse,
  DestinationFilters,
  CreateDestinationData,
  UpdateDestinationData,
  DESTINATION_CATEGORIES,
  DESTINATION_SORT_OPTIONS
} from '../models/destination.model';
import { ApiResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private readonly API_BASE_URL = 'http://localhost:5000/api';
  
  // Reactive state using signals
  private destinationsSignal = signal<Destination[]>([]);
  private loadingSignal = signal<boolean>(false);
  private searchFiltersSignal = signal<DestinationFilters>({});
  private searchQuerySignal = signal<string>('');
  
  // Public computed signals
  public destinations = this.destinationsSignal.asReadonly();
  public isLoading = this.loadingSignal.asReadonly();
  public searchFilters = this.searchFiltersSignal.asReadonly();
  public searchQuery = this.searchQuerySignal.asReadonly();
  
  // Filtered destinations based on current filters and search
  public filteredDestinations = computed(() => {
    let filtered = this.destinationsSignal();
    const filters = this.searchFiltersSignal();
    const query = this.searchQuerySignal();
    
    // Apply search query
    if (query) {
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(query.toLowerCase()) ||
        dest.description.toLowerCase().includes(query.toLowerCase()) ||
        dest.country.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(dest => dest.category === filters.category);
    }
    
    // Apply budget filter
    if (filters.minBudget || filters.maxBudget) {
      filtered = filtered.filter(dest => {
        if (!dest.estimatedBudget) return true;
        const budget = dest.estimatedBudget.budget;
        if (filters.minBudget && budget < filters.minBudget) return false;
        if (filters.maxBudget && budget > filters.maxBudget) return false;
        return true;
      });
    }
    
    return filtered;
  });

  constructor(private http: HttpClient) {}

  // Get all destinations
  getDestinations(params?: DestinationSearchParams): Observable<DestinationSearchResponse> {
    this.loadingSignal.set(true);
    
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof DestinationSearchParams];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<ApiResponse<Destination[]>>(`${this.API_BASE_URL}/destinations`, { params: httpParams })
      .pipe(
        map(response => ({
          destinations: response.data,
          total: response.total || 0,
          pagination: response.pagination
        })),
        tap(result => {
          this.destinationsSignal.set(result.destinations);
        }),
        catchError(error => {
          const message = error.error?.message || 'Failed to fetch destinations';
          return throwError(() => new Error(message));
        }),
        tap(() => this.loadingSignal.set(false))
      );
  }

  // Get single destination
  getDestination(id: string): Observable<Destination> {
    return this.http.get<ApiResponse<Destination>>(`${this.API_BASE_URL}/destinations/${id}`)
      .pipe(
        map(response => response.data),
        catchError(error => {
          const message = error.error?.message || 'Failed to fetch destination';
          return throwError(() => new Error(message));
        })
      );
  }

  // Search destinations
  searchDestinations(query: string, filters?: DestinationFilters): Observable<Destination[]> {
    this.loadingSignal.set(true);
    this.searchQuerySignal.set(query);
    if (filters) {
      this.searchFiltersSignal.set(filters);
    }
    
    let httpParams = new HttpParams().set('q', query);
    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = filters[key as keyof DestinationFilters];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<ApiResponse<Destination[]>>(`${this.API_BASE_URL}/destinations/search`, { params: httpParams })
      .pipe(
        map(response => response.data),
        tap(destinations => {
          this.destinationsSignal.set(destinations);
        }),
        catchError(error => {
          const message = error.error?.message || 'Failed to search destinations';
          return throwError(() => new Error(message));
        }),
        tap(() => this.loadingSignal.set(false))
      );
  }

  // Get popular destinations
  getPopularDestinations(limit: number = 10): Observable<Destination[]> {
    return this.http.get<ApiResponse<Destination[]>>(`${this.API_BASE_URL}/destinations/popular`, {
      params: { limit: limit.toString() }
    })
      .pipe(
        map(response => response.data),
        catchError(error => {
          const message = error.error?.message || 'Failed to fetch popular destinations';
          return throwError(() => new Error(message));
        })
      );
  }

  // Get destinations by category
  getDestinationsByCategory(category: string, params?: DestinationSearchParams): Observable<DestinationSearchResponse> {
    this.loadingSignal.set(true);
    
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof DestinationSearchParams];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<ApiResponse<Destination[]>>(`${this.API_BASE_URL}/destinations/category/${category}`, { params: httpParams })
      .pipe(
        map(response => ({
          destinations: response.data,
          total: response.total || 0,
          pagination: response.pagination
        })),
        tap(result => {
          this.destinationsSignal.set(result.destinations);
        }),
        catchError(error => {
          const message = error.error?.message || 'Failed to fetch destinations by category';
          return throwError(() => new Error(message));
        }),
        tap(() => this.loadingSignal.set(false))
      );
  }

  // Create destination (Admin only)
  createDestination(destinationData: CreateDestinationData): Observable<Destination> {
    return this.http.post<ApiResponse<Destination>>(`${this.API_BASE_URL}/destinations`, destinationData)
      .pipe(
        map(response => response.data),
        catchError(error => {
          const message = error.error?.message || 'Failed to create destination';
          return throwError(() => new Error(message));
        })
      );
  }

  // Update destination (Admin only)
  updateDestination(id: string, destinationData: UpdateDestinationData): Observable<Destination> {
    return this.http.put<ApiResponse<Destination>>(`${this.API_BASE_URL}/destinations/${id}`, destinationData)
      .pipe(
        map(response => response.data),
        catchError(error => {
          const message = error.error?.message || 'Failed to update destination';
          return throwError(() => new Error(message));
        })
      );
  }

  // Delete destination (Admin only)
  deleteDestination(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE_URL}/destinations/${id}`)
      .pipe(
        catchError(error => {
          const message = error.error?.message || 'Failed to delete destination';
          return throwError(() => new Error(message));
        })
      );
  }

  // Utility methods
  getCategories() {
    return DESTINATION_CATEGORIES;
  }

  getSortOptions() {
    return DESTINATION_SORT_OPTIONS;
  }

  // Update search filters
  updateSearchFilters(filters: DestinationFilters): void {
    this.searchFiltersSignal.set(filters);
  }

  // Update search query
  updateSearchQuery(query: string): void {
    this.searchQuerySignal.set(query);
  }

  // Clear search and filters
  clearSearch(): void {
    this.searchQuerySignal.set('');
    this.searchFiltersSignal.set({});
  }

  // Sort destinations
  sortDestinations(destinations: Destination[], sortBy: string): Destination[] {
    const sorted = [...destinations];
    
    switch (sortBy) {
      case 'rating':
        return sorted.sort((a, b) => b.averageRating - a.averageRating);
      case 'popular':
        return sorted.sort((a, b) => b.totalReviews - a.totalReviews);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'budget-low':
        return sorted.sort((a, b) => {
          const budgetA = a.estimatedBudget?.budget || 0;
          const budgetB = b.estimatedBudget?.budget || 0;
          return budgetA - budgetB;
        });
      case 'budget-high':
        return sorted.sort((a, b) => {
          const budgetA = a.estimatedBudget?.budget || 0;
          const budgetB = b.estimatedBudget?.budget || 0;
          return budgetB - budgetA;
        });
      default:
        return sorted;
    }
  }

  // Filter destinations by budget
  filterByBudget(destinations: Destination[], minBudget?: number, maxBudget?: number): Destination[] {
    return destinations.filter(destination => {
      if (!destination.estimatedBudget) return true;

      const budget = destination.estimatedBudget.budget;

      if (minBudget && budget < minBudget) return false;
      if (maxBudget && budget > maxBudget) return false;

      return true;
    });
  }
}
