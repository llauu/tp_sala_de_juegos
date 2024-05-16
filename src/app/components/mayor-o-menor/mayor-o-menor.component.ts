import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mayor-o-menor',
  standalone: true,
  imports: [NgIf, FontAwesomeModule],
  templateUrl: './mayor-o-menor.component.html',
  styleUrl: './mayor-o-menor.component.css'
})
export class MayorOMenorComponent {
  deckId: string | null = null; 
  actualCard: any = null;
  prevCardValue: string = '';
  gameStarted: boolean = false;
  orderValues: string[] = ['ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING'];
  playerScore: number = 0;

  stillPlay: boolean = true;
  gameOver: boolean = false;

  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;

  constructor(private http: HttpClient) { }

 
  getCard(action: string) {    
    if(action === 'start') {
      this.http.get<any[]>('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
        // .pipe(  ); // pipe es una especie de mw, va a toamr los datos q me deuvelva la peticion antes de que lleguen a la suscripcion
        .subscribe((data: any) => {
          this.gameStarted = true;
          this.deckId = data.deck_id;

          this.actualCard = data.cards[0];
        });
    } else {
      this.http.get<any[]>(`https://www.deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)
        .subscribe((data: any) => {
          this.prevCardValue = this.actualCard.value;
          this.actualCard = data.cards[0];

          if(action === 'up') {
            this.isHigher();
          } else {
            this.isLower();
          }
        });
    }
  }

  isHigher() {
    if(this.orderValues.indexOf(this.actualCard.value) >= this.orderValues.indexOf(this.prevCardValue)) {
      this.playerScore++;
    }
    else {
      this.stillPlay = false;
      this.gameOver = true;
    }
  }

  isLower() {
    if(this.orderValues.indexOf(this.actualCard.value) <= this.orderValues.indexOf(this.prevCardValue)) {
      this.playerScore++;
    }
    else {
      this.stillPlay = false;
      this.gameOver = true;
    }
  }

  resetGame() {
    this.deckId = null;
    this.actualCard = null;
    this.prevCardValue = '';
    this.gameStarted = false;
    this.stillPlay = true;
    this.gameOver = false;
    this.playerScore = 0;
  }


}
