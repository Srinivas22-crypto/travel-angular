import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UiButton } from '../../components/ui/button/button';
import { UiCard, UiCardContent } from '../../components/ui/card/card';
import { UiBadge } from '../../components/ui/badge/badge';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, TranslateModule, UiButton, UiCard, UiCardContent, UiBadge],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  constructor(public router: Router) {}

  quickActions = [
    {
      icon: `<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>`,
      title: 'book.flights',
      description: "Find the best deals on flights worldwide",
      action: () => this.router.navigate(['/book']),
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: `<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`,
      title: 'nav.explore',
      description: "Discover amazing places to visit",
      action: () => this.router.navigate(['/explore']),
      color: "bg-green-50 text-green-600"
    },
    {
      icon: `<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`,
      title: 'nav.community',
      description: "Connect with fellow travelers",
      action: () => this.router.navigate(['/community']),
      color: "bg-purple-50 text-purple-600"
    }
  ];

  featuredDestinations = [
    {
      name: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52",
      rating: 4.9,
      highlights: ["Eiffel Tower", "Louvre Museum", "Notre Dame"]
    },
    {
      name: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
      rating: 4.8,
      highlights: ["Shibuya Crossing", "Mount Fuji", "Cherry Blossoms"]
    },
    {
      name: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1",
      rating: 4.7,
      highlights: ["Rice Terraces", "Temples", "Beaches"]
    }
  ];
}
