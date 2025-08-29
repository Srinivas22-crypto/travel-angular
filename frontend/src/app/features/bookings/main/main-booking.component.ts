import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';

interface FlightSearch {
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  passengers: string;
}

interface HotelSearch {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: string;
}

interface CarSearch {
  location: string;
}

interface FlightDeal {
  from: string;
  to: string;
  airline: string;
  duration: string;
  price: number;
  rating: number;
}

interface FeaturedHotel {
  name: string;
  location: string;
  image: string;
  amenities: string[];
  rating: number;
  type: string;
  feature: string;
}

@Component({
  selector: 'app-main-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './main-booking.component.html',
  styleUrls: ['./main-booking.component.css']
})
export class MainBookingComponent implements OnInit {
  activeTab: string = 'flights';
  isDarkMode: boolean = false;

  constructor(private route: ActivatedRoute) {}

  flightSearch: FlightSearch = {
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: '1'
  };

  hotelSearch: HotelSearch = {
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '2-1'
  };

  carSearch: CarSearch = {
    location: ''
  };

  flightDeals: FlightDeal[] = [
    {
      from: 'New York',
      to: 'Paris',
      airline: 'Air France',
      duration: '7h 30m',
      price: 589,
      rating: 4.5
    },
    {
      from: 'London',
      to: 'Tokyo',
      airline: 'British Airways',
      duration: '11h 45m',
      price: 645,
      rating: 4.7
    },
    {
      from: 'Los Angeles',
      to: 'Sydney',
      airline: 'Qantas',
      duration: '15h 20m',
      price: 725,
      rating: 4.6
    }
  ];

  featuredHotels: FeaturedHotel[] = [
    {
      name: 'Grand Palace Hotel',
      location: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
      amenities: ['Wifi', 'Pool', 'Restaurant'],
      rating: 4.8,
      type: 'Wifi',
      feature: 'Pool'
    },
    {
      name: 'Tokyo Bay Resort',
      location: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop',
      amenities: ['Wifi', 'Gym', 'Restaurant'],
      rating: 4.6,
      type: 'Wifi',
      feature: 'Gym'
    },
    {
      name: 'Harbor View Inn',
      location: 'Sydney, Australia',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop',
      amenities: ['Wifi', 'Pool', 'Restaurant'],
      rating: 4.4,
      type: 'Wifi',
      feature: 'Pool'
    }
  ];

  ngOnInit(): void {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme();
    
    // Check for tab query parameter
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.activeTab = params['tab'];
      }
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  searchFlights(): void {
    console.log('Searching flights:', this.flightSearch);
    // Implement flight search logic
  }

  searchHotels(): void {
    console.log('Searching hotels:', this.hotelSearch);
    // Implement hotel search logic
  }

  searchCars(): void {
    console.log('Searching cars:', this.carSearch);
    // Implement car search logic
  }

  getStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) {
      stars += '☆';
    }
    return stars;
  }
}
