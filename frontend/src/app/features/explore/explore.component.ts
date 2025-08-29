import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  rating: number;
  price: number;
  category: string;
  featured: boolean;
}

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  destinations: Destination[] = [];
  filteredDestinations: Destination[] = [];
  searchQuery = '';
  selectedCategory = 'all';
  sortBy = 'rating';
  isLoading = false;

  categories = [
    { value: 'all', label: 'All Destinations' },
    { value: 'beach', label: 'Beach' },
    { value: 'mountain', label: 'Mountain' },
    { value: 'city', label: 'City' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'cultural', label: 'Culture' },
    { value: 'nature', label: 'Nature' },
    { value: 'food', label: 'Food' }
  ];

  categoryCards = [
    { value: 'all', label: 'All', icon: '🌍' },
    { value: 'adventure', label: 'Adventure', icon: '🏔️' },
    { value: 'beach', label: 'Beach', icon: '🏖️' },
    { value: 'cultural', label: 'Culture', icon: '🏛️' },
    { value: 'food', label: 'Food', icon: '🍽️' },
    { value: 'nature', label: 'Nature', icon: '🌿' },
    { value: 'city', label: 'City', icon: '🏙️' }
  ];

  sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' }
  ];

  ngOnInit(): void {
    this.loadDestinations();
  }

  loadDestinations(): void {
    this.isLoading = true;
    
    // Mock data - replace with actual API call
    setTimeout(() => {
      this.destinations = [
        {
          id: '1',
          name: 'Bali, Indonesia',
          country: 'Indonesia',
          image: '/assets/destinations/bali.jpg',
          description: 'Tropical paradise with stunning beaches and rich culture',
          rating: 4.8,
          price: 899,
          category: 'beach',
          featured: true
        },
        {
          id: '2',
          name: 'Swiss Alps',
          country: 'Switzerland',
          image: '/assets/destinations/swiss-alps.jpg',
          description: 'Breathtaking mountain views and world-class skiing',
          rating: 4.9,
          price: 1299,
          category: 'mountain',
          featured: true
        },
        {
          id: '3',
          name: 'Tokyo, Japan',
          country: 'Japan',
          image: '/assets/destinations/tokyo.jpg',
          description: 'Modern metropolis blending tradition and innovation',
          rating: 4.7,
          price: 1099,
          category: 'city',
          featured: false
        },
        {
          id: '4',
          name: 'Machu Picchu, Peru',
          country: 'Peru',
          image: '/assets/destinations/machu-picchu.jpg',
          description: 'Ancient Incan citadel high in the Andes Mountains',
          rating: 4.9,
          price: 1499,
          category: 'adventure',
          featured: true
        },
        {
          id: '5',
          name: 'Santorini, Greece',
          country: 'Greece',
          image: '/assets/destinations/santorini.jpg',
          description: 'Iconic white-washed buildings overlooking the Aegean Sea',
          rating: 4.6,
          price: 1199,
          category: 'beach',
          featured: false
        },
        {
          id: '6',
          name: 'Kyoto, Japan',
          country: 'Japan',
          image: '/assets/destinations/kyoto.jpg',
          description: 'Historic temples and traditional Japanese culture',
          rating: 4.8,
          price: 999,
          category: 'cultural',
          featured: false
        },
        {
          id: '7',
          name: 'Paris, France',
          country: 'France',
          image: '/assets/destinations/paris.jpg',
          description: 'City of lights with world-class cuisine and culture',
          rating: 4.7,
          price: 1399,
          category: 'food',
          featured: false
        },
        {
          id: '8',
          name: 'Yellowstone, USA',
          country: 'USA',
          image: '/assets/destinations/yellowstone.jpg',
          description: 'America\'s first national park with geysers and wildlife',
          rating: 4.6,
          price: 799,
          category: 'nature',
          featured: false
        }
      ];
      
      this.filteredDestinations = [...this.destinations];
      this.isLoading = false;
    }, 1000);
  }

  onSearch(): void {
    this.applyFilters();
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applySorting();
  }
  
  applyFilters(): void {
    this.filteredDestinations = this.destinations.filter(destination => {
      const matchesSearch = !this.searchQuery || 
        destination.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        destination.country.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        destination.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesCategory = this.selectedCategory === 'all' || 
        destination.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    this.applySorting();
  }

  private applySorting(): void {
    this.filteredDestinations.sort((a, b) => {
      switch (this.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popular':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating;
      }
    });
  }

  getFeaturedDestinations(): Destination[] {
    return this.destinations.filter(dest => dest.featured).slice(0, 3);
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStarArray(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  getCategoryCount(category: string): number {
    if (category === 'all') {
      return this.destinations.length;
    }
    return this.destinations.filter(dest => dest.category === category).length;
  }
}
