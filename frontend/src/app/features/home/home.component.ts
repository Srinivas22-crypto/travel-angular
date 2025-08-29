import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  destinations = [
    {
      id: 1,
      name: 'Paris, France',
      image: '/assets/images/paris.jpg',
      rating: 4.9,
      tags: ['Eiffel Tower', 'Louvre Museum', 'Notre Dame']
    },
    {
      id: 2,
      name: 'Tokyo, Japan',
      image: '/assets/images/tokyo.jpg',
      rating: 4.8,
      tags: ['Shibuya Crossing', 'Mount Fuji', 'Cherry Blossoms']
    },
    {
      id: 3,
      name: 'Bali, Indonesia',
      image: '/assets/images/bali.jpg',
      rating: 4.7,
      tags: ['Rice Terraces', 'Temples', 'Beaches']
    }
  ];

  stats = [
    {
      icon: '🌍',
      value: '180+',
      label: 'Destinations'
    },
    {
      icon: '👥',
      value: '50K+',
      label: 'Happy Travelers'
    },
    {
      icon: '📸',
      value: '120K+',
      label: '5-Star Reviews'
    },
    {
      icon: '❤️',
      value: '1M+',
      label: 'Memories Created'
    }
  ];

  quickActions = [
    {
      icon: '✈️',
      title: 'Flights',
      description: 'Find the best deals on flights worldwide',
      link: '/bookings/flights'
    },
    {
      icon: '📍',
      title: 'Explore',
      description: 'Discover amazing places to visit',
      link: '/explore'
    },
    {
      icon: '👥',
      title: 'Community',
      description: 'Connect with fellow travelers',
      link: '/community'
    }
  ];
}
