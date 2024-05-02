import { Component } from '@angular/core';
import { Router } from '@angular/router';
  import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/authentification/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone:true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
     CommonModule

  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(
      response => {
        const token = response.token;
        const message = response.message;
        localStorage.setItem('token', token);
        this.router.navigate(['/client']);
      },
      error => {
        this.errorMessage = 'Invalid email or password'; // Handle error appropriately
        this.openSnackBar(this.errorMessage, 'Close'); // Display error message
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000, // Duration in milliseconds
      verticalPosition: 'top' // Positioning
    });
  }
}
