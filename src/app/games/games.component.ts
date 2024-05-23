import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-games',
  standalone: false,
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {
    // gifSeleccionado: string | null = null;

  // mostrarGif(gif: string): void {
  //   this.gifSeleccionado = gif;
  // }

  // ocultarGif(): void {
  //   this.gifSeleccionado = null;
  // }
  // imagen = '../../assets/gifs/slot.jpg';
  // gif = '../../assets/gifs/slot.gif';
  // mostrarGif = false;
  // constructor(private router: Router) { }
  // alternarGif(): void {
  //   this.mostrarGif = !this.mostrarGif;
  // }
  // navegarAJuego(nombre: string): void {
  //   this.router.navigate(["/games/slot"]);
  //   // window.location.href = ''+nombre;
  // }
  gridCols: number;
  imagen = '../../assets/img/slot.png';
  imagen2 = '../../assets/img/ahorcado2.png';
  imagen3 = '../../assets/img/mayor_menor.png';
  imagen4 = '../../assets/img/quiz.png';
  gif = '../../assets/gifs/slot.gif';
  gif2 = '';
  gif3 = '';
  gif4 = '';
  mostrarGif = false;
  constructor(private router: Router) {this.gridCols = window.innerWidth >= 600 ? 2 : 1; }
  alternarGif(): void {
    this.mostrarGif = !this.mostrarGif;
  }
  navegarAJuego(nombre: string): void {
    this.router.navigate([nombre]);
  }
}
