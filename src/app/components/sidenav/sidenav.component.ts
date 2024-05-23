import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
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
      route: "home",
    },
    {
      icon: "videogame_asset",
      label: "Juegos",
      route: "games"
    },
    {
      icon: "mark_unread_chat_alt",
      label: "Chat",
      route: "chat"
    },{
      icon: "info",
      label: "Sobre mi",
      route: "about",
    },
  ]);
  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : '100'));
  // getFilteredMenuItems() {
  //   // console.log(this.authService.usuarioActual());
  //   return this.menuItems().filter(item => item.route !== 'chat' || this.authService.usuarioActual());
    
  // }
}
