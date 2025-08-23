import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  travelUpdates: boolean;
  marketingCommunications: boolean;
}

interface PrivacySettings {
  publicProfile: boolean;
  showTravelHistory: boolean;
  allowMessages: boolean;
}

@Component({
  selector: 'app-profile-settings',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, TranslateModule],
  templateUrl: './profile-settings.html',
  styleUrl: './profile-settings.scss'
})
export class ProfileSettings implements OnInit {
  activeTab = signal<'personal' | 'notifications' | 'privacy' | 'billing'>('personal');
  isLoading = signal(false);
  isSaving = signal(false);

  // Forms
  personalInfoForm: FormGroup;
  passwordForm: FormGroup;

  // Settings
  notificationSettings = signal<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    travelUpdates: true,
    marketingCommunications: false
  });

  privacySettings = signal<PrivacySettings>({
    publicProfile: true,
    showTravelHistory: false,
    allowMessages: true
  });

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {
    this.personalInfoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      location: [''],
      bio: ['', Validators.maxLength(500)]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');

    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  setActiveTab(tab: 'personal' | 'notifications' | 'privacy' | 'billing'): void {
    this.activeTab.set(tab);
  }

  loadUserData(): void {
    const user = this.authService.user();
    if (user) {
      this.personalInfoForm.patchValue({
        name: user.name,
        email: user.email,
        phone: '', // Add phone to user model if needed
        location: '', // Add location to user model if needed
        bio: user.bio || ''
      });

      // Load notification settings from user preferences
      if (user.preferences?.notifications) {
        this.notificationSettings.set({
          emailNotifications: user.preferences.notifications.email,
          pushNotifications: user.preferences.notifications.push,
          travelUpdates: true, // Default value
          marketingCommunications: user.preferences.notifications.marketing
        });
      }
    }
  }

  updatePersonalInfo(): void {
    if (this.personalInfoForm.valid) {
      this.isSaving.set(true);
      const formData = this.personalInfoForm.value;

      this.authService.updateProfile(formData).subscribe({
        next: (updatedUser) => {
          console.log('Profile updated successfully:', updatedUser);
          // TODO: Show success toast
        },
        error: (error) => {
          console.error('Failed to update profile:', error);
          // TODO: Show error toast
        },
        complete: () => {
          this.isSaving.set(false);
        }
      });
    }
  }

  updatePassword(): void {
    if (this.passwordForm.valid) {
      this.isSaving.set(true);
      const { currentPassword, newPassword } = this.passwordForm.value;

      this.authService.updatePassword({ currentPassword, newPassword }).subscribe({
        next: (response) => {
          console.log('Password updated successfully:', response);
          this.passwordForm.reset();
          // TODO: Show success toast
        },
        error: (error) => {
          console.error('Failed to update password:', error);
          // TODO: Show error toast
        },
        complete: () => {
          this.isSaving.set(false);
        }
      });
    }
  }

  updateNotificationSettings(): void {
    this.isSaving.set(true);
    const settings = this.notificationSettings();

    // TODO: Implement API call to update notification settings
    setTimeout(() => {
      console.log('Notification settings updated:', settings);
      this.isSaving.set(false);
      // TODO: Show success toast
    }, 1000);
  }

  updatePrivacySettings(): void {
    this.isSaving.set(true);
    const settings = this.privacySettings();

    // TODO: Implement API call to update privacy settings
    setTimeout(() => {
      console.log('Privacy settings updated:', settings);
      this.isSaving.set(false);
      // TODO: Show success toast
    }, 1000);
  }

  onNotificationChange(setting: keyof NotificationSettings, value: boolean): void {
    const current = this.notificationSettings();
    this.notificationSettings.set({
      ...current,
      [setting]: value
    });
  }

  onPrivacyChange(setting: keyof PrivacySettings, value: boolean): void {
    const current = this.privacySettings();
    this.privacySettings.set({
      ...current,
      [setting]: value
    });
  }

  getFieldError(formGroup: FormGroup, fieldName: string): string | null {
    const field = formGroup.get(fieldName);
    if (field && field.invalid && field.touched) {
      if (field.errors?.['required']) {
        return `${fieldName} is required`;
      }
      if (field.errors?.['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors?.['minlength']) {
        return `${fieldName} must be at least ${field.errors?.['minlength'].requiredLength} characters`;
      }
      if (field.errors?.['maxlength']) {
        return `${fieldName} must be no more than ${field.errors?.['maxlength'].requiredLength} characters`;
      }
    }

    // Check for password mismatch
    if (fieldName === 'confirmPassword' && formGroup.errors?.['passwordMismatch'] && field?.touched) {
      return 'Passwords do not match';
    }

    return null;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
