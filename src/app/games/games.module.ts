import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { SlotComponent } from './slot/slot.component';
import { TriviaComponent } from './trivia/trivia.component';
import { CardsComponent } from './cards/cards.component';
import { HangmanComponent } from './hangman/hangman.component';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { GamesComponent } from './games.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [GamesComponent, SlotComponent, TriviaComponent, CardsComponent, HangmanComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
    MatGridList, MatGridTile, MatTabsModule, MatGridListModule, HttpClientModule, MatIconModule, MatDividerModule, MatButtonModule, MatProgressSpinnerModule
  ]
})
export class GamesModule { }
