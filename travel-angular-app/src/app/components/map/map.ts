import { Component, Input, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export interface MapMarker {
  lat: number;
  lng: number;
  title: string;
  description?: string;
  icon?: string;
}

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrl: './map.scss'
})
export class Map implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  @Input() markers: MapMarker[] = [];
  @Input() center: [number, number] = [40.7128, -74.0060]; // Default to NYC
  @Input() zoom: number = 10;
  @Input() height: string = '400px';
  @Input() width: string = '100%';

  private map: any;
  private markerLayer: any;
  private L: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // Only initialize on browser
    if (isPlatformBrowser(this.platformId)) {
      this.loadLeaflet();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.L) {
      this.initializeMap();
      this.addMarkers();
    }
  }

  private async loadLeaflet(): Promise<void> {
    try {
      this.L = await import('leaflet');

      // Fix for default markers in Leaflet
      delete (this.L.Icon.Default.prototype as any)._getIconUrl;
      this.L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'assets/marker-icon-2x.png',
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      });
    } catch (error) {
      console.error('Failed to load Leaflet:', error);
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initializeMap(): void {
    if (!this.L || !isPlatformBrowser(this.platformId)) return;

    // Set map container dimensions
    this.mapContainer.nativeElement.style.height = this.height;
    this.mapContainer.nativeElement.style.width = this.width;

    // Initialize the map
    this.map = this.L.map(this.mapContainer.nativeElement, {
      center: this.center,
      zoom: this.zoom,
      zoomControl: true,
      attributionControl: true
    });

    // Add tile layer
    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.map);

    // Initialize marker layer
    this.markerLayer = this.L.layerGroup().addTo(this.map);
  }

  private addMarkers(): void {
    if (!this.map || !this.markerLayer || !this.L) return;

    // Clear existing markers
    this.markerLayer.clearLayers();

    // Add new markers
    this.markers.forEach(markerData => {
      const marker = this.L.marker([markerData.lat, markerData.lng]);

      // Add popup if description is provided
      if (markerData.description) {
        marker.bindPopup(`
          <div class="map-popup">
            <h3 class="font-semibold text-lg mb-2">${markerData.title}</h3>
            <p class="text-sm text-gray-600">${markerData.description}</p>
          </div>
        `);
      } else {
        marker.bindPopup(`<h3 class="font-semibold">${markerData.title}</h3>`);
      }

      marker.addTo(this.markerLayer);
    });

    // Fit map to markers if there are any
    if (this.markers.length > 0) {
      const group = new this.L.FeatureGroup(this.markerLayer.getLayers());
      this.map.fitBounds(group.getBounds().pad(0.1));
    }
  }

  // Public methods to update the map
  updateMarkers(markers: MapMarker[]): void {
    this.markers = markers;
    this.addMarkers();
  }

  setCenter(lat: number, lng: number, zoom?: number): void {
    if (this.map) {
      this.map.setView([lat, lng], zoom || this.zoom);
    }
  }

  addMarker(marker: MapMarker): void {
    this.markers.push(marker);
    this.addMarkers();
  }

  clearMarkers(): void {
    this.markers = [];
    if (this.markerLayer) {
      this.markerLayer.clearLayers();
    }
  }
}
