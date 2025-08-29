import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface TranslationKeys {
  [key: string]: string | TranslationKeys;
}

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private translations: { [lang: string]: TranslationKeys } = {
    en: {
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        cancel: 'Cancel',
        save: 'Save',
        edit: 'Edit',
        delete: 'Delete',
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort'
      },
      auth: {
        signin: 'Sign In',
        register: 'Register',
        logout: 'Logout',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        forgotPassword: 'Forgot Password?',
        rememberMe: 'Remember me'
      },
      navigation: {
        home: 'Home',
        explore: 'Explore',
        community: 'Community',
        bookings: 'Bookings',
        profile: 'Profile',
        notifications: 'Notifications'
      },
      explore: {
        title: 'Explore Amazing Destinations',
        subtitle: 'Discover your next adventure from thousands of destinations worldwide',
        searchPlaceholder: 'Search destinations, countries, or experiences...',
        featuredDestinations: 'Featured Destinations',
        allDestinations: 'All Destinations',
        noResults: 'No destinations found'
      }
    },
    es: {
      common: {
        loading: 'Cargando...',
        error: 'Error',
        success: 'Éxito',
        cancel: 'Cancelar',
        save: 'Guardar',
        edit: 'Editar',
        delete: 'Eliminar',
        search: 'Buscar',
        filter: 'Filtrar',
        sort: 'Ordenar'
      },
      auth: {
        signin: 'Iniciar Sesión',
        register: 'Registrarse',
        logout: 'Cerrar Sesión',
        email: 'Correo Electrónico',
        password: 'Contraseña',
        confirmPassword: 'Confirmar Contraseña',
        forgotPassword: '¿Olvidaste tu contraseña?',
        rememberMe: 'Recordarme'
      },
      navigation: {
        home: 'Inicio',
        explore: 'Explorar',
        community: 'Comunidad',
        bookings: 'Reservas',
        profile: 'Perfil',
        notifications: 'Notificaciones'
      },
      explore: {
        title: 'Explora Destinos Increíbles',
        subtitle: 'Descubre tu próxima aventura entre miles de destinos en todo el mundo',
        searchPlaceholder: 'Buscar destinos, países o experiencias...',
        featuredDestinations: 'Destinos Destacados',
        allDestinations: 'Todos los Destinos',
        noResults: 'No se encontraron destinos'
      }
    },
    fr: {
      common: {
        loading: 'Chargement...',
        error: 'Erreur',
        success: 'Succès',
        cancel: 'Annuler',
        save: 'Enregistrer',
        edit: 'Modifier',
        delete: 'Supprimer',
        search: 'Rechercher',
        filter: 'Filtrer',
        sort: 'Trier'
      },
      auth: {
        signin: 'Se Connecter',
        register: 'S\'inscrire',
        logout: 'Se Déconnecter',
        email: 'E-mail',
        password: 'Mot de Passe',
        confirmPassword: 'Confirmer le Mot de Passe',
        forgotPassword: 'Mot de passe oublié?',
        rememberMe: 'Se souvenir de moi'
      },
      navigation: {
        home: 'Accueil',
        explore: 'Explorer',
        community: 'Communauté',
        bookings: 'Réservations',
        profile: 'Profil',
        notifications: 'Notifications'
      },
      explore: {
        title: 'Explorez des Destinations Incroyables',
        subtitle: 'Découvrez votre prochaine aventure parmi des milliers de destinations dans le monde',
        searchPlaceholder: 'Rechercher des destinations, pays ou expériences...',
        featuredDestinations: 'Destinations Vedettes',
        allDestinations: 'Toutes les Destinations',
        noResults: 'Aucune destination trouvée'
      }
    }
  };

  public availableLanguages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  constructor() {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    const browserLanguage = navigator.language.split('-')[0];
    
    const language = savedLanguage || 
      (this.isLanguageSupported(browserLanguage) ? browserLanguage : 'en');
    
    this.setLanguage(language);
  }

  private isLanguageSupported(language: string): boolean {
    return this.availableLanguages.some(lang => lang.code === language);
  }

  setLanguage(language: string): void {
    if (this.isLanguageSupported(language)) {
      this.currentLanguageSubject.next(language);
      localStorage.setItem('selectedLanguage', language);
      document.documentElement.lang = language;
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  translate(key: string, params?: { [key: string]: string }): string {
    const language = this.getCurrentLanguage();
    const translation = this.getNestedTranslation(this.translations[language], key);
    
    if (!translation) {
      // Fallback to English if translation not found
      const fallback = this.getNestedTranslation(this.translations['en'], key);
      return this.interpolateParams(fallback || key, params);
    }
    
    return this.interpolateParams(translation, params);
  }

  private getNestedTranslation(obj: TranslationKeys, key: string): string | null {
    const keys = key.split('.');
    let current: any = obj;
    
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        return null;
      }
    }
    
    return typeof current === 'string' ? current : null;
  }

  private interpolateParams(text: string, params?: { [key: string]: string }): string {
    if (!params) return text;
    
    let result = text;
    Object.keys(params).forEach(key => {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), params[key]);
    });
    
    return result;
  }

  // Helper method for templates
  t(key: string, params?: { [key: string]: string }): string {
    return this.translate(key, params);
  }
}
