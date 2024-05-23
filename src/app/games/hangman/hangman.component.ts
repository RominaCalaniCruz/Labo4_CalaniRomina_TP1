import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hangman',
  standalone: false,
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.scss'
})
export class HangmanComponent {
  palabraOculta = '';
  intentos = 0;
  palabra = '';
  gano = false;
  perdio = false;
  jugando = true;
  botonesHabilitados: boolean[][];
  letrasTeclado: string[][] = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    ['J','K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q'],
    ['R','S','T','U', 'V', 'W', 'X', 'Y', 'Z']
  ];
  
  palabras = ['JAVASCRIPT', 'HTML', 'ANGULAR', 'SPAN', 'JUEGOS', 'APLICACION', 'TELETRABAJO', 'CELULAR', 'PANTALLA', 'COMPUTADORA'];

  
  
  
  constructor() {
    this.inicializarValores();
  
  }

  inicializarValores(){
    this.palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.palabraOculta = '_ '.repeat(this.palabra.length).trimEnd();
    this.botonesHabilitados = this.letrasTeclado.map(row => row.map(() => false));
  }

  comprobar(letra : string,fila: number, columna: number) {

    this.existeLetra(letra);
    const palabraOcultaArr = this.palabraOculta.split(' ');
    this.botonesHabilitados[fila][columna] = true;
    
    for (let i = 0; i < this.palabra.length; i++) {

      if (this.palabra[i] === letra) {
        palabraOcultaArr[i] = letra;
      }

    }

    this.palabraOculta = palabraOcultaArr.join(' ');
    this.verificaGane();

  }

  desactivarBoton(fila: number, columna: number){
    return this.botonesHabilitados[fila][columna];
  }
  verificaGane() {

    const palabraArr = this.palabraOculta.split(' ');
    const palabraEvaluar = palabraArr.join('');

    if (palabraEvaluar === this.palabra) {
      this.gano = true;
      this.jugando = false;
      console.log('Usuario GANO');
    }

    if (this.intentos >= 7) {
      this.perdio = true;
      this.jugando = false;
      console.log('Usuario perdio');
    }

  }


  existeLetra(letra: string) {
    if (!this.palabra.includes(letra)) {
      this.intentos++;
    }
  }
  reiniciarPartida(){
    this.inicializarValores();
    this.jugando = true;
    this.intentos = 0;
    this.perdio = false;
    this.gano = false;
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Juego reiniciado',
      showConfirmButton: false,
      timer: 1300
    });
  }
}
