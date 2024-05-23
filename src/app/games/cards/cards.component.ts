import { Component, OnInit } from '@angular/core';
import { CartasService } from '../../services/cartas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cards',
  standalone: false,
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {
  cards: any[] = [];
  isLoading: boolean = true;
  currentCardIndex: number = 0;
  message: string = '';
  cantVidas: number = 3;
  jugando = false;
  vistaTemporal = false;
  mensajeTemporal = false;
  cartaAtras = 'assets/img/back.png';

  constructor(private cartasSvc: CartasService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cartasSvc.crearBaraja().subscribe(deck => {
      this.cartasSvc.drawCards(deck.deck_id).subscribe(draw => {
        this.cards = draw.cards;
        this.isLoading = false;
      });
    });
  }

  iniciarPartida() {
    this.jugando = true;
    this.currentCardIndex = 0;
    this.mezclarCartas();
  }

  mezclarCartas(): void {
    this.cards.sort(() => Math.random() - 0.5);
  }

  verificarFinJuego(): void {
    if (this.cantVidas == 0) {
      this.message = '¡Se te acabaron las vidas!';
      this.jugando = false;
      this.cantVidas = 3;
      setTimeout(() => {
        Swal.fire(
          {
            icon: 'info',
            title: this.message,
            text: 'Obtuviste 0 puntos',
          }
        );
      }, 1000);
    }
  }
  esMayor(): void {
    this.verificarAcierto(true);
  }

  esMenor(): void {
    this.verificarAcierto(false);
  }

  verificarAcierto(isHigher: boolean): void {
    if (this.currentCardIndex < this.cards.length - 1) {
      const nextCardValue = this.traerValorNumericoCarta(this.cards[this.currentCardIndex + 1].value);
      const currentCardValue = this.traerValorNumericoCarta(this.cards[this.currentCardIndex].value);
      if ((isHigher && nextCardValue > currentCardValue) || (!isHigher && nextCardValue < currentCardValue)) {
        this.message = 'Acertaste!';
      } else if ((isHigher && nextCardValue < currentCardValue) || (!isHigher && nextCardValue > currentCardValue)) {
        this.message = 'Ups..incorrecto (╥﹏╥)';
        this.cantVidas--;
      } else {
        this.message = 'Son iguales (ㆆ_ㆆ)';
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

  traerValorNumericoCarta(valor: any): number {
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
