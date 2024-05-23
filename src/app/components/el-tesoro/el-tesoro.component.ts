import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-el-tesoro',
  standalone: true,
  imports: [NgIf],
  templateUrl: './el-tesoro.component.html',
  styleUrl: './el-tesoro.component.css'
})
export class ElTesoroComponent {
  treasureCoordinates: number[] = [];
  hint: string = '¡Empieza!';
  gameOver: boolean = false;
  attempts: number = 0;
  score: number = 0;

  constructor() {}

  ngOnInit() {
    this.treasureCoordinates = this.getTreasureCoordinates();
    console.log(this.treasureCoordinates[0], this.treasureCoordinates[1]);
  }

  getTreasureCoordinates() {
    return [Math.floor(Math.random() * 6), Math.floor(Math.random() * 6)];
  }

  checkCoords(x: number, y: number, event: MouseEvent) {
    const sandLocker = event.target as HTMLButtonElement;

    if (x === this.treasureCoordinates[0] && y === this.treasureCoordinates[1]) {
      sandLocker.setAttribute('src', '../../../assets/juegos/arena_tesoro.png');
      this.hint = '¡Encontraste el tesoro!';
      this.gameOver = true;
      this.disableLockers();

      this.score = 500 - this.attempts * 10;
      if(this.score < 0) {
        this.score = 0;
      }
    }
    else {
      sandLocker.setAttribute('src', '../../../assets/juegos/arena_vacio.png');
      this.attempts++;
      this.hint = this.generateHint(x, y);
    }
  }

  calculteDistance(x: number, y: number) {
    const diffX = this.treasureCoordinates[0] - x;
    const diffY = this.treasureCoordinates[1] - y;
    return Math.sqrt(diffX * diffX + diffY * diffY);
  }

  generateHint(x: number, y: number) {
    const distance = this.calculteDistance(x, y);

    if (distance < 2) {
      return '¡Muy caliente!';
    } 
    else if (distance < 3) {
      return '¡Caliente!';
    } 
    else if (distance < 4) {
      return '¡Frío!';
    } 
    else {
      return '¡Muy frío!';
    }
  }

  resetGame() {
    this.treasureCoordinates = this.getTreasureCoordinates();
    this.hint = '¡Empieza!';
    this.score = 0;
    this.attempts = 0;
    this.gameOver = false;
    const sandLockers = document.querySelectorAll('.sand-locker');

    sandLockers.forEach((sandLocker) => {
      sandLocker.setAttribute('src', '../../../assets/juegos/arena.png');
      sandLocker.classList.remove('disabled');
    });
  }

  disableLockers() {
    const sandLockers = document.querySelectorAll('.sand-locker');

    sandLockers.forEach((sandLocker) => {
      sandLocker.classList.add('disabled');
    });
  }
}
