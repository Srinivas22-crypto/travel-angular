export interface Flight {
  _id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    city: string;
    country: string;
    dateTime: string;
  };
  arrival: {
    airport: string;
    city: string;
    country: string;
    dateTime: string;
  };
  duration: string;
  price: {
    economy: number;
    business?: number;
    first?: number;
  };
  availableSeats: {
    economy: number;
    business: number;
    first: number;
  };
  aircraft?: string;
  amenities: string[];
  isActive: boolean;
}

export interface Hotel {
  _id: string;
  name: string;
  description?: string;
  location: {
    address: string;
    city: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  pricePerNight: {
    standard: number;
    deluxe?: number;
    suite?: number;
  };
  totalRooms: {
    standard: number;
    deluxe: number;
    suite: number;
  };
  amenities: string[];
  images: string[];
  rating: number;
  totalReviews: number;
  checkInTime: string;
  checkOutTime: string;
  isActive: boolean;
}

export interface Car {
  _id: string;
  make: string;
  model: string;
  year: number;
  category: 'economy' | 'compact' | 'midsize' | 'fullsize' | 'luxury' | 'suv' | 'convertible';
  pricePerDay: number;
  location: {
    city: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  features: string[];
  images: string[];
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  transmission: 'manual' | 'automatic';
  seats: number;
  isActive: boolean;
}

export interface Booking {
  _id: string;
  user: string;
  type: 'flight' | 'hotel' | 'car';
  flight?: Flight;
  hotel?: Hotel;
  car?: Car;
  startDate: string;
  endDate: string;
  passengers?: Array<{
    name: string;
    email?: string;
    phone?: string;
    dateOfBirth?: string;
  }>;
  roomDetails?: {
    roomType: 'standard' | 'deluxe' | 'suite';
    numberOfRooms: number;
    guests: number;
  };
  flightDetails?: {
    class: 'economy' | 'business' | 'first';
    seatNumbers?: string[];
  };
  totalAmount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  bookingReference: string;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FlightSearchParams {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  class?: 'economy' | 'business' | 'first';
  tripType?: 'one-way' | 'round-trip';
}

export interface HotelSearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface CarSearchParams {
  location: string;
  pickupDate: string;
  returnDate: string;
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface CreateBookingData {
  type: 'flight' | 'hotel' | 'car';
  flight?: string;
  hotel?: string;
  car?: string;
  startDate: string;
  endDate: string;
  passengers?: Array<{
    name: string;
    email?: string;
    phone?: string;
    dateOfBirth?: string;
  }>;
  roomDetails?: {
    roomType: 'standard' | 'deluxe' | 'suite';
    numberOfRooms: number;
    guests: number;
  };
  flightDetails?: {
    class: 'economy' | 'business' | 'first';
    seatNumbers?: string[];
  };
  totalAmount: number;
  currency?: string;
  specialRequests?: string;
}

export interface BookingSearchParams {
  page?: number;
  limit?: number;
  status?: string;
  type?: string;
  sort?: string;
}

export interface BookingSearchResponse {
  bookings: Booking[];
  total: number;
  pagination?: {
    next?: { page: number; limit: number };
    prev?: { page: number; limit: number };
  };
}

export const BOOKING_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'text-yellow-600' },
  { value: 'confirmed', label: 'Confirmed', color: 'text-green-600' },
  { value: 'cancelled', label: 'Cancelled', color: 'text-red-600' },
  { value: 'completed', label: 'Completed', color: 'text-blue-600' }
] as const;

export const PAYMENT_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'text-yellow-600' },
  { value: 'paid', label: 'Paid', color: 'text-green-600' },
  { value: 'failed', label: 'Failed', color: 'text-red-600' },
  { value: 'refunded', label: 'Refunded', color: 'text-purple-600' }
] as const;
