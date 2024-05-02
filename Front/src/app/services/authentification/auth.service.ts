import { Injectable, Signal, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../models/auth.models';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private tokenKey = '';
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:8087/api/v1/signin', { email, password }).pipe(
      tap(response => {
         const role = response.role;
        localStorage.setItem("role", role);
      })
    );
  }


  signUp(firstName: string, lastName: string, email: string, password: string,role : string): Observable<any> {
    return this.http.post<any>('http://localhost:8087/api/v1/signup', { firstName, lastName, email, password , role })
      .pipe(
        catchError(error => {
          // Handle the error here
          let errorMessage = 'An error occurred while signing up.';

           if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }

          // Log the error for debugging purposes
          console.error('Sign-up error:', error);
          localStorage.setItem("role" , role)
           return throwError(errorMessage);
        })
      );
  }
  hasToken(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
       return !!token;
    }
    return false;
  }
  getUserRole(): string {
    const role = localStorage.getItem('role');
    return role ? role : 'anonymous';
  }
}
