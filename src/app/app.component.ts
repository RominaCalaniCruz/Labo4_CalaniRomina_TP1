import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatButtonModule,MatIconModule, MatSidenavModule, SidenavComponent,MatListModule,
    MatMenuModule, HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sala-de-juegos-tp';
  // collapsed = signal(false);
  // sidenavWidth = computed(() => (this.isExpanded ? "65px" : "250px"));
  isLoggedIn: boolean = false;
  isExpanded: boolean = false;
  sidenavWidth = 200;
  contenido = 200;
  username: string;
  toggleSidenav() {
    // this.isLoggedIn = !this.isLoggedIn;
    this.isExpanded = !this.isExpanded;
    this.sidenavWidth = this.isExpanded ? 65 : 200;
    this.contenido = this.isExpanded ? this.sidenavWidth : 65;
  }
  constructor(private dialog: MatDialog,public authSvc: FirebaseService) {
    if(localStorage.getItem('user')){
      this.username = this.authSvc.getLocalStorage('user').name;
      this.isLoggedIn = true;
    }
  }
  openLogin(){
    const dialogRef = this.dialog.open(LoginComponent, {
  
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('La ventana modal se cerró');
      this.username = this.authSvc.getLocalStorage('user').name;
      this.isLoggedIn = true;
    });
  }
  singOut(){
    this.authSvc.CloseSession();
    this.isLoggedIn = false;
  }
}
