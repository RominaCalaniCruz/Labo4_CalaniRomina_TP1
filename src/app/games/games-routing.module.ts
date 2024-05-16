import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlotComponent } from './slot/slot.component';
import { HangmanComponent } from './hangman/hangman.component';
import { TriviaComponent } from './trivia/trivia.component';
import { CardsComponent } from './cards/cards.component';
import { GamesComponent } from './games.component';

const routes: Routes = [
  {
    path: '', component: GamesComponent
  },
  {
    path:'slot',component: SlotComponent
  },
  {
    path:'hangman',component: HangmanComponent
  },
  {
    path:'trivia',component: TriviaComponent
  },
  {
    path:'cards',component: CardsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
