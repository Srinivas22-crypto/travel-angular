import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, User } from '../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser$: Observable<User | null>;
  profileForm: FormGroup;
  isEditing = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      bio: [''],
      location: [''],
      website: [''],
      preferences: this.fb.group({
        newsletter: [true],
        notifications: [true],
        darkMode: [false]
      })
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.profileForm.patchValue({
        name: user.name,
        email: user.email,
        bio: user.preferences?.bio || '',
        location: user.preferences?.location || '',
        website: user.preferences?.website || '',
        preferences: {
          newsletter: user.preferences?.newsletter ?? true,
          notifications: user.preferences?.notifications ?? true,
          darkMode: user.preferences?.darkMode ?? false
        }
      });
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.loadUserProfile(); // Reset form if canceling
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const formData = this.profileForm.value;
      
      this.authService.updateProfile(formData).subscribe({
        next: () => {
          this.successMessage = 'Profile updated successfully!';
          this.isEditing = false;
          this.isLoading = false;
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to update profile';
          this.isLoading = false;
        }
      });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.profileForm.get(fieldName);
    if (field?.touched && field?.errors) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }
}
