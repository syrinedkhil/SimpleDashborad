import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import {MatMenuModule} from '@angular/material/menu';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './services/authentification/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    CommonModule,
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router,public authService: AuthService) { }
   @ViewChild('nav') nav: MatSidenav;
  title = 'Dashboard';

  hasToken(): boolean {
    return this.authService.hasToken();
  }
  hasRole(role: string): boolean {
    const userRole = this.authService.getUserRole();
   return userRole === role;
 }
  logout() {
    localStorage.removeItem('Role');

    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }

}
