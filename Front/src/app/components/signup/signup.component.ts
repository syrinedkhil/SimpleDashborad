import { Component ,inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/authentification/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule , CommonModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
 
  email: string = '';
  password: string = '';
  role: string = ''; // Initialize role variable

  signupForm: FormGroup;
  roles: string[] = ['travailleur', 'productManager', 'contributeur'];

   constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      role: ['', Validators.required],
    });
  }

  signup(): void {
    if (this.signupForm.invalid) {
      this.openSnackBar('Please fill out all fields correctly.', 'Close');
      return;
    }

    const { firstName, lastName, email, password, role } = this.signupForm.value;
    this.authService.signUp(firstName, lastName, email, password, role).subscribe(
      (response) => {
        // Handle successful sign-up here
        console.log('Sign-up successful:', response);
        this.openSnackBar('Sign-up successful', 'Close');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Sign-up error:', error);
        let errorMessage = 'An error occurred during sign-up. Please try again.';
        if (error.message === 'Email address is already exists.') {
          errorMessage = 'This email address is already registered.';
        }
        this.openSnackBar(errorMessage, 'Close');
      }
    );
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
