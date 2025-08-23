import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DestinationService } from '../../services/destination.service';
import { Destination, DestinationFilters } from '../../models/destination.model';
import { Map, MapMarker } from '../../components/map/map';

@Component({
  selector: 'app-explore',
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule, Map],
  templateUrl: './explore.html',
  styleUrl: './explore.scss'
})
export class Explore implements OnInit {
  searchTerm = signal('');
  selectedCategory = signal('all');
  sortBy = signal('rating');
  showMap = signal(false);

  constructor(public destinationService: DestinationService) {}

  ngOnInit(): void {
    // Load destinations on component initialization
    this.loadDestinations();
  }

  get categories() {
    return [
      { value: 'all', label: 'All Categories' },
      ...this.destinationService.getCategories()
    ];
  }

  get sortOptions() {
    return this.destinationService.getSortOptions();
  }

  get filteredDestinations() {
    return this.destinationService.filteredDestinations();
  }

  get isLoading() {
    return this.destinationService.isLoading();
  }

  get mapMarkers(): MapMarker[] {
    return this.filteredDestinations.map(dest => ({
      lat: dest.coordinates?.latitude || 0,
      lng: dest.coordinates?.longitude || 0,
      title: dest.name,
      description: `${dest.description} - ${dest.country}`
    })).filter(marker => marker.lat !== 0 && marker.lng !== 0);
  }

  loadDestinations(): void {
    this.destinationService.getDestinations().subscribe({
      next: (response) => {
        console.log('Destinations loaded:', response);
      },
      error: (error) => {
        console.error('Failed to load destinations:', error);
        // TODO: Show error toast
      }
    });
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const query = target.value;
    this.searchTerm.set(query);
    this.destinationService.updateSearchQuery(query);
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const category = target.value;
    this.selectedCategory.set(category);

    const filters: DestinationFilters = {
      category: category === 'all' ? undefined : category
    };
    this.destinationService.updateSearchFilters(filters);
  }

  onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortBy.set(target.value);
    // TODO: Implement sorting in the service
  }

  toggleMapView(): void {
    this.showMap.set(!this.showMap());
  }
}
