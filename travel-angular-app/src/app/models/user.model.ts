export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  bio?: string;
  profileImage?: string;
  preferences: {
    language: string;
    currency: string;
    notifications: {
      email: boolean;
      push: boolean;
      marketing: boolean;
    };
  };
  isVerified: boolean;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  data: User;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
  total?: number;
  pagination?: {
    next?: { page: number; limit: number };
    prev?: { page: number; limit: number };
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
