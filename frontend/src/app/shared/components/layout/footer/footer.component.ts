import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', icon: '📘' },
    { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
    { name: 'Instagram', url: 'https://instagram.com', icon: '📷' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' }
  ];

  footerLinks = {
    company: [
      { name: 'About Us', route: '/about' },
      { name: 'Careers', route: '/careers' },
      { name: 'Press', route: '/press' },
      { name: 'Blog', route: '/blog' }
    ],
    support: [
      { name: 'Help Center', route: '/help' },
      { name: 'Contact Us', route: '/contact' },
      { name: 'Safety', route: '/safety' },
      { name: 'Accessibility', route: '/accessibility' }
    ],
    legal: [
      { name: 'Privacy Policy', route: '/privacy' },
      { name: 'Terms of Service', route: '/terms' },
      { name: 'Cookie Policy', route: '/cookies' },
      { name: 'Sitemap', route: '/sitemap' }
    ]
  };
}
