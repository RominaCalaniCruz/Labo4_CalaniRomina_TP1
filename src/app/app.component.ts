import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './components/header/header.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './auth/login/login.component';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, SidenavComponent, MatListModule,
    MatMenuModule, HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'SALA DE JUEGOS - UTN';
  authSvc = inject(FirebaseService);
  isLoggedIn: boolean = false;
  isExpanded: boolean = false;
  sidenavWidth = 200;
  contenido = 200;
  username: string;
  constructor(private dialog: MatDialog, private router: Router) {
  }
  ngOnInit(): void {
    this.authSvc.user$.subscribe(user => {
      if (user) {
        this.authSvc.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
        this.isLoggedIn = true;
        this.username = user.displayName;
      }
      else {
        this.authSvc.currentUserSig.set(null);
      }
      console.log(this.authSvc.currentUserSig());
    });
  }
  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
    this.sidenavWidth = this.isExpanded ? 65 : 200;
    this.contenido = this.isExpanded ? this.sidenavWidth : 65;
  }

  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('La ventana modal se cerró');
        this.isLoggedIn = true;
      }
      else {
        console.log("se cerro pero no inicio sesion");
      }
    });
  }
  singOut() {
    this.isLoggedIn = false;
    this.authSvc.cerrarSesion().then(() => {
      this.router.navigate(['home']);
    });
  }
}
