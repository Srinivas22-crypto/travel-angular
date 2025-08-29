# Travel Angular Frontend

A modern, responsive travel web application built with Angular 17+ featuring a modular architecture, dark mode support, internationalization, and comprehensive booking management.

## 🚀 Features

- **Modern Angular Architecture**: Built with Angular 17+ using standalone components
- **Modular Design**: Organized into feature modules (Auth, Explore, Community, Bookings, Profile)
- **Dark Mode Support**: Toggle between light and dark themes with localStorage persistence
- **Internationalization**: Multi-language support (English, Spanish, French, German)
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Authentication**: JWT-based authentication with guards and interceptors
- **API Integration**: Ready for backend integration with service layer and HTTP interceptors
- **Reusable Components**: Shared UI components (Button, Modal, Loading Spinner)
- **Form Validation**: Custom validators and reactive forms
- **Route Guards**: Protected routes with authentication and guest guards

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                    # Core services, guards, interceptors
│   │   ├── services/           # AuthService, ApiService, ThemeService, I18nService
│   │   ├── guards/             # AuthGuard, GuestGuard
│   │   └── interceptors/       # HTTP interceptors
│   ├── shared/                 # Shared components and utilities
│   │   ├── components/         # Reusable UI components
│   │   ├── pipes/              # Custom pipes (TranslatePipe)
│   │   ├── directives/         # Custom directives
│   │   └── utils/              # Utility functions and validators
│   ├── features/               # Feature modules
│   │   ├── auth/               # Authentication (SignIn, Register)
│   │   ├── explore/            # Destination exploration
│   │   ├── community/          # Travel community posts
│   │   ├── bookings/           # Booking management
│   │   ├── profile/            # User profile
│   │   ├── notifications/      # Notification center
│   │   └── destination/        # Destination details
│   ├── environments/           # Environment configurations
│   └── styles.css              # Global styles and CSS variables
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd travel-angular/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Update `src/environments/environment.ts` with your backend API URL:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:3000/api', // Your backend URL
     // ... other config
   };
   ```

4. **Start development server**
   ```bash
   ng serve
   ```

5. **Open browser**
   Navigate to `http://localhost:4200/`

## 🔧 Available Scripts

- `ng serve` - Start development server
- `ng build` - Build for production
- `ng test` - Run unit tests
- `ng lint` - Run linting
- `ng e2e` - Run end-to-end tests

## 🎨 Theming & Styling

The application uses CSS custom properties for consistent theming:

- **CSS Variables**: Defined in `styles.css` for colors, spacing, typography
- **Dark Mode**: Automatic theme switching with `ThemeService`
- **Responsive**: Mobile-first design with utility classes
- **Component Styles**: Scoped styles for each component

## 🌐 Internationalization

Multi-language support is implemented with:

- `I18nService` for translation management
- `TranslatePipe` for template translations
- Language files for English, Spanish, French, German
- Language selector in header component

## 🔐 Authentication

Authentication system includes:

- JWT token management
- HTTP interceptor for automatic token attachment
- Auth guards for route protection
- Token refresh mechanism
- Login/Register forms with validation

## 📱 Components

### Core Components
- **HeaderComponent**: Navigation, search, language toggle, theme toggle
- **FooterComponent**: Links, newsletter signup, social media
- **NotFoundComponent**: 404 error page

### Feature Components
- **Auth**: SignIn and Register with form validation
- **Explore**: Destination listing with search and filters
- **Community**: Travel posts feed with social interactions
- **Bookings**: Booking management (flights, hotels, cars)
- **Profile**: User profile management
- **Notifications**: Notification center

### Shared UI Components
- **ButtonComponent**: Reusable button with variants and states
- **ModalComponent**: Modal dialog with customizable content
- **LoadingSpinnerComponent**: Loading indicators

## 🔌 Backend Integration

The frontend is ready for backend integration:

1. **Update environment files** with your API endpoints
2. **Configure CORS** on your backend for the frontend domain
3. **Update API service methods** to match your backend endpoints
4. **Customize authentication flow** based on your backend implementation

### Expected Backend Endpoints

```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
GET  /api/destinations
GET  /api/bookings
POST /api/bookings
GET  /api/profile
PUT  /api/profile
```

## 🚀 Deployment

### Production Build
```bash
ng build --configuration production
```

### Environment Variables
Update `src/environments/environment.prod.ts` for production:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/api',
  // ... other production config
};
```

## 🧪 Testing

- **Unit Tests**: Jest/Jasmine for component testing
- **E2E Tests**: Protractor/Cypress for end-to-end testing
- **Linting**: ESLint for code quality

## 📦 Dependencies

### Core Dependencies
- Angular 17+
- RxJS for reactive programming
- Angular Router for navigation
- Angular Forms for form handling

### Development Dependencies
- TypeScript
- Angular CLI
- ESLint
- Karma & Jasmine for testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Check the GitHub issues
- Review the Angular documentation
- Contact the development team

---

**Happy Coding! 🎉**
