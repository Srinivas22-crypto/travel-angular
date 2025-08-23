import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-signin',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
  templateUrl: './signin.html',
  styleUrl: './signin.scss'
})
export class Signin {
  signinForm: FormGroup;
  showPassword = signal(false);
  isLoading = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService,
    private toastService: ToastService
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  onSubmit(): void {
    if (this.signinForm.valid) {
      this.isLoading.set(true);

      const credentials = this.signinForm.value;

      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.toastService.error('Login Failed', error.message || 'Please check your credentials and try again.');
        },
        complete: () => {
          this.isLoading.set(false);
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.signinForm.markAllAsTouched();
    }
  }

  getFieldError(fieldName: string): string | null {
    const field = this.signinForm.get(fieldName);
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
    }
    return null;
  }
}
