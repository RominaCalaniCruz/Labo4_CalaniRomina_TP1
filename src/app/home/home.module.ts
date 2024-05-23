import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatGridList, MatGridTile, MatTabsModule, MatGridListModule, MatButtonModule
  ]
})
export class HomeModule { }
