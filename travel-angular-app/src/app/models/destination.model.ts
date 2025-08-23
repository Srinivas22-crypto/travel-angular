export interface Destination {
  _id: string;
  name: string;
  description: string;
  country: string;
  city?: string;
  category: 'beach' | 'mountain' | 'city' | 'cultural' | 'adventure' | 'relaxation';
  images: string[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  averageRating: number;
  totalReviews: number;
  popularActivities: string[];
  bestTimeToVisit?: string;
  estimatedBudget?: {
    budget: number;
    luxury: number;
  };
  isActive: boolean;
  createdAt: string;
}

export interface DestinationSearchParams {
  page?: number;
  limit?: number;
  sort?: string;
  country?: string;
  category?: string;
  minBudget?: number;
  maxBudget?: number;
  q?: string;
}

export interface DestinationFilters {
  category?: string;
  minBudget?: number;
  maxBudget?: number;
}

export interface DestinationSearchResponse {
  destinations: Destination[];
  total: number;
  pagination?: {
    next?: { page: number; limit: number };
    prev?: { page: number; limit: number };
  };
}

export interface CreateDestinationData extends Omit<Destination, '_id' | 'createdAt' | 'isActive'> {}

export interface UpdateDestinationData extends Partial<Destination> {}

export const DESTINATION_CATEGORIES = [
  { value: 'beach', label: 'Beach' },
  { value: 'mountain', label: 'Mountain' },
  { value: 'city', label: 'City' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'relaxation', label: 'Relaxation' }
] as const;

export const DESTINATION_SORT_OPTIONS = [
  { value: 'rating', label: 'Rating' },
  { value: 'popular', label: 'Popularity' },
  { value: 'name', label: 'Name' },
  { value: 'budget-low', label: 'Budget (Low to High)' },
  { value: 'budget-high', label: 'Budget (High to Low)' }
] as const;
