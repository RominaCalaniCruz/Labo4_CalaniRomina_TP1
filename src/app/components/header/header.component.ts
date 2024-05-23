import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule,
    MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  isExpanded: boolean = false;
  sidenavWidth = 250;
  contenido = 250;
  toggleSidenav() {
    this.isLoggedIn = !this.isLoggedIn;
    this.isExpanded = !this.isExpanded;
    this.sidenavWidth = this.isExpanded ? 65 : 250;
    this.contenido = this.isExpanded ? this.sidenavWidth : 65;
  }
}
