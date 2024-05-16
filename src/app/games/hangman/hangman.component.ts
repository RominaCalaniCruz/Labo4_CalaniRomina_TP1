import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hangman',
  standalone: false,
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.scss'
})
export class HangmanComponent {
  palabraOculta = '';

  intentos = 0;

  gano = false;
  perdio = false;

  keyboardRows: string[][] = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    ['J','K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q'],
    ['R','S','T','U', 'V', 'W', 'X', 'Y', 'Z']
  ];

  letras = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  
  palabras = ['SAL', 'PIMIENTA', 'CONEJO', 'PERRO', 'COCHE', 'VIDEOJUEGOS', 'VENTILADOR', 'TELEFONO', 'SERPIENTE', 'POLICIA'];

  palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)];;
  
  
  constructor() {

    this.palabraOculta = '_ '.repeat(this.palabra.length);

  }

  comprobar(letra) {

    this.existeLetra(letra);
    const palabraOcultaArr = this.palabraOculta.split(' ');

    for (let i = 0; i < this.palabra.length; i++) {

      if (this.palabra[i] === letra) {
        palabraOcultaArr[i] = letra;
      }

    }

    this.palabraOculta = palabraOcultaArr.join(' ');
    this.verificaGane();

  }

  verificaGane() {

    const palabraArr = this.palabraOculta.split(' ');
    const palabraEvaluar = palabraArr.join('');

    if (palabraEvaluar === this.palabra) {
      this.gano = true;
      console.log('Usuario GANO');
    }

    if (this.intentos >= 9) {
      this.perdio = true;
      console.log('Usuario perdio');
    }

  }


  existeLetra(letra) {

    if (this.palabra.indexOf(letra) >= 0) {
      // console.log('Letra existe ' + letra );
    } else {
      // console.log('Letra NO existe ' + letra );
      this.intentos++;
    }

  }
}
