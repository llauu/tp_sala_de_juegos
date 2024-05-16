import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [NgIf, FontAwesomeModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
  words: string[] = ["CERVEZA", "COCINA", "BICICLETA", "GAFAS", "TELEFONO", "LIBRERIA", "TECLADO", "PARAGUAS", "ZAPATOS", "CAMISA", "SOMBRERO", "MAQUILLAJE", "REVISTA", "CAMION", "COLCHON", "PANTALLA", "RADIO", "MASCARA", "CARTERA", "MONITOR", "MARIPOSA", "PIZZA", "CARAMELO", "PELOTA", "CINTURON", "PANTALON", "COCHE", "JARDIN", "PISCINA", "CUADERNO", "TABLETA", "MOCHILA", "LLAVES", "BILLETERA", "PERRO", "PARLANTE", "TIGRE", "ELEFANTE", "CEPILLO", "ESPEJO", "GUITARRA", "SILLA", "GRAFICA", "VENTANA", "LAPIZ", "PLUMA", "PIANO", "AURICULAR"];
  wordSelected: string = '';
  wordUser: string[] = [];
  lifes: number = 6;
  lose: boolean = false;
  gameOver: boolean = false;
  faHeart = faHeart;


  ngOnInit() {
    this.wordSelected = this.getWord();
    this.initializeWordUser();

    console.log(this.wordSelected);
  }

  getLetter(letter: string) {
    this.tryLetterInWord(letter, this.wordSelected);

    if(this.gameFinished()) {
      this.gameOver = true;
    }
    else {
      if(this.lifes === 0) {
        this.lose = true;
        this.gameOver = true;
      }
    }

    return letter;
  }

  getWord() {
    let word = this.words[Math.floor(Math.random() * this.words.length)];
    
    return word;
  }

  initializeWordUser() {
    for(let i = 0; i < this.wordSelected.length; i++) {
      this.wordUser[i] = '_';
    }
  }

  isLetterInWord(letter: string, word: string) {
    return word.includes(letter);
  }

  tryLetterInWord(letter: string, word: string) {
    let found = false;

    for(let i = 0; i < word.length; i++) {
      if(word[i] === letter) {
        found = true;
        this.wordUser[i] = letter;
      }
    }

    if(!found) {
      this.lifes--;
    }
  }

  gameFinished() {
    return this.wordUser.join('') === this.wordSelected;
  }

  resetGame() {
    this.wordSelected = this.getWord();
    this.wordUser = [];
    this.lifes = 6;
    this.lose = false;
    this.gameOver = false;
    this.initializeWordUser();
  }

  getLifesArray() {
    return new Array(this.lifes);
  }
  
  getNotLifesArray() {
    return new Array(6 - this.lifes);
  }

}
