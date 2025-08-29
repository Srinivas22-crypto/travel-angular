import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../../../core/services/auth.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<User | null>;
  isAuthenticated$: Observable<boolean>;
  isDarkMode$: Observable<boolean>;
  searchQuery = '';
  isMenuOpen = false;
  selectedLanguage = 'en';

  languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' }
  ];

  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.isDarkMode$ = this.themeService.isDarkMode$;
  }

  ngOnInit(): void {
    this.selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', this.searchQuery);
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLanguageChange(): void {
    localStorage.setItem('selectedLanguage', this.selectedLanguage);
    // Implement i18n language change
    console.log('Language changed to:', this.selectedLanguage);
  }

  logout(): void {
    this.authService.logout();
    this.isMenuOpen = false;
  }
}
