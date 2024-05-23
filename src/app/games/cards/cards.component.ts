import { Component, OnInit } from '@angular/core';
import { CartasService } from '../../services/cartas.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cards',
  standalone: false,
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit{
  cards: any[] = [];
  isLoading: boolean = true;
  currentCardIndex: number = 0;
  message: string = '';
  showSpinner = false;
  cantPartidas:number=5;
  partidaFinalizada:boolean=false;
  cantVidas : number = 3;
  jugando =false;
  vistaTemporal = false;
  mensajeTemporal = false;
  cartaAtras = 'assets/img/back.png';
  constructor(private cartasSvc: CartasService,private _snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.cartasSvc.crearBaraja().subscribe(deck => {
      this.cartasSvc.drawCards(deck.deck_id).subscribe(draw => {
        this.cards = draw.cards;
        this.isLoading = false;
        // this.jugando = true;
        console.log(this.getCardValue(this.cards[this.currentCardIndex].value));
      });
    });
  }

  iniciarPartida(){
    this.jugando = true;
    this.currentCardIndex = 0;
    this.cantVidas = 3;
    this.mezclarCartas();
  }
  mezclarCartas(): void {
    this.cards.sort(() => Math.random() - 0.5);
  }
  guessHigher(): void {
    if (this.currentCardIndex < this.cards.length - 1) {
      const nextCardValue = this.getCardValue(this.cards[this.currentCardIndex + 1].value) ;
      console.log(nextCardValue);
      const currentCardValue = this.getCardValue(this.cards[this.currentCardIndex].value);
      console.log(currentCardValue);

      if (nextCardValue > currentCardValue) {
        this.message = '¡Adivinaste!';
      } else  if (nextCardValue < currentCardValue){
        this.message = '¡Fallaste!';
        this.cantVidas--;
      } else{
        this.message = 'son iguales';
      }
      this.vistaTemporal = true;
      this.mensajeTemporal = true;
      this._snackBar.open(this.message, 'cerrar', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 1000,
        panelClass: ['snack-bar-enter']
      });
      setTimeout(() => {
        this.vistaTemporal = false;
        this.currentCardIndex++;
        this.mensajeTemporal = false;
      }, 1000);
    } else {
      this.message = 'No hay más cartas';
    }

    this.verificarFinJuego();
  }
  private verificarFinJuego(): void {
    if (this.cantVidas == 0) {
      this.message = '¡Fin del juego!';

      this.jugando = false;
      setTimeout(() => {
        Swal.fire(
          {
            icon: 'info',
            title: this.message,
            text:'Obtuviste 0 puntos',
            // timer: 2000
          }
        );
        
      }, 1000);
    }
  }

  guessLower(): void {
    if (this.currentCardIndex < this.cards.length - 1) {

      const nextCardValue = this.getCardValue(this.cards[this.currentCardIndex + 1].value) ;
      console.log(nextCardValue);
      const currentCardValue = this.getCardValue(this.cards[this.currentCardIndex].value);
      console.log(currentCardValue);
      if (nextCardValue < currentCardValue) {
        this.message = '¡Adivinaste!';
      } else  if (nextCardValue > currentCardValue) {
        this.message = '¡Fallaste!';
        this.cantVidas--;
      }else{
        this.message = 'son iguales';
      }
      this.vistaTemporal = true;
      this.mensajeTemporal = true;
      this._snackBar.open(this.message, 'cerrar', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 1000,
        panelClass: ['snack-bar-enter']
      });
      setTimeout(() => {
        this.vistaTemporal = false;
        this.currentCardIndex++;
        this.mensajeTemporal = false;
        
      }, 1000);
    } else {
      this.message = 'No hay más cartas';
    }
    this.verificarFinJuego();
  }
  private getCardValue(valor: any): number {
    switch (valor) {
      case 'ACE': return 1;
      case '2': return 2;
      case '3': return 3;
      case '4': return 4;
      case '5': return 5;
      case '6': return 6;
      case '7': return 7;
      case '8': return 8;
      case '9': return 9;
      case '10': return 10;
      case 'JACK': return 11;
      case 'QUEEN': return 12;
      case 'KING': return 13;
      default: return 0; 
    }
  }
}
