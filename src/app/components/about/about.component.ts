import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NgbCollapseModule,NgbToastModule  } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatCardModule, MatListModule,MatIconModule ,NgbCollapseModule,RouterLink,NgbToastModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  isMenuCollapsed = true;
  show = false;
	autohide = true;
}
