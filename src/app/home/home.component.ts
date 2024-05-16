import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // gifSeleccionado: string | null = null;

  // mostrarGif(gif: string): void {
  //   this.gifSeleccionado = gif;
  // }

  // ocultarGif(): void {
  //   this.gifSeleccionado = null;
  // }
  gridCols: number;
  imagen = '../../assets/gifs/slot.jpg';
  imagen2 = '../../assets/gifs/ahorcado.png';
  imagen3 = '../../assets/gifs/cartas.png';
  imagen4 = '../../assets/gifs/quiz.png';
  gif = '../../assets/gifs/slot.gif';
  mostrarGif = false;
  constructor(private router: Router) {this.gridCols = window.innerWidth >= 600 ? 2 : 1; }
  alternarGif(): void {
    this.mostrarGif = !this.mostrarGif;
  }
  navegarAJuego(nombre: string): void {
    this.router.navigate([nombre]);
    // window.location.href = ''+nombre;
  }
}
