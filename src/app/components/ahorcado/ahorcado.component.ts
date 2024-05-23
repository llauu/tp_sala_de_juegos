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

    // console.log(this.wordSelected);
  }

  getLetter(letter: string, event: MouseEvent) {
    this.tryLetterInWord(letter, this.wordSelected);

    const buttonElement = event.target as HTMLButtonElement;
    buttonElement.setAttribute('disabled', '');

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

  resetButtons() {
    const row1 = document.querySelectorAll('.row-1 button');
    const row2 = document.querySelectorAll('.row-2 button');
    const row3 = document.querySelectorAll('.row-3 button');

    row1.forEach((button) => {
      button.removeAttribute('disabled');
    });

    row2.forEach((button) => {
      button.removeAttribute('disabled');
    });

    row3.forEach((button) => {
      button.removeAttribute('disabled');
    });
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
    this.resetButtons();
  }

  getLifesArray() {
    return new Array(this.lifes);
  }
  
  getNotLifesArray() {
    return new Array(6 - this.lifes);
  }
}
