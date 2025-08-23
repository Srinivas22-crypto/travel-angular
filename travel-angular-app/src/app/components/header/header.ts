import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, FormsModule, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  isMobileMenuOpen = signal(false);
  isSearchOpen = signal(false);
  isUserMenuOpen = signal(false);
  searchQuery = signal('');

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
    // Close other menus
    this.isUserMenuOpen.set(false);
    this.isSearchOpen.set(false);
  }

  toggleSearch(): void {
    this.isSearchOpen.set(!this.isSearchOpen());
    if (!this.isSearchOpen()) {
      this.searchQuery.set('');
    }
    // Close other menus
    this.isMobileMenuOpen.set(false);
    this.isUserMenuOpen.set(false);
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen.set(!this.isUserMenuOpen());
    // Close other menus
    this.isMobileMenuOpen.set(false);
    this.isSearchOpen.set(false);
  }

  closeUserMenu(): void {
    this.isUserMenuOpen.set(false);
  }

  handleSearch(): void {
    if (this.searchQuery().trim()) {
      console.log('Searching for:', this.searchQuery());
      // TODO: Implement search functionality
      this.toggleSearch();
    }
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Logout failed:', error);
      }
    });
  }
}
