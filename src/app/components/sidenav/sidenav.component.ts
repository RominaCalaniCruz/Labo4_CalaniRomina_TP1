import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
export type MenuItem = {
  icon: string,
  label: string,
  route: string
}
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, MatIconModule,MatListModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
      this.sideNavCollapsed.set(val);
  }
  
  menuItems = signal<MenuItem[]>([
    {
      icon: "home",
      label: "Inicio",
      route: "about",
    },
    // {
    //   icon: "face",
    //   label: "Cuenta",
    //   route: "auth/login",
    // },
    // {
    //   icon: "info",
    //   label: "Informacion",
    //   route: "about",
    // },
    {
      icon: "videogame_asset",
      label: "Juegos",
      route: "games"
    },
    {
      icon: "mark_unread_chat_alt",
      label: "Chat",
      route: "chat"
    }
  ]);
  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : '100'));
  // isExpanded: boolean = true;
  // menuItems = [
  //   { name: 'Inicio', icon: 'home' },
  //   { name: 'Juegos', icon: 'settings' },
  //   { name: 'Quien soy', icon: 'info' }
  // ];

  // toggleSidenav() {
  //   this.isExpanded = !this.isExpanded;
  // }
}
