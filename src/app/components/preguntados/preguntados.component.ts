import { Component } from '@angular/core';
import { TriviaService } from '../../services/trivia-service.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [NgIf],
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent {
  difficulty: string = 'medium';
  category: string = 'Sports';
  categoryNumber: string = '21';
  gameStarted: boolean = false;
  gameOver: boolean = false;
  question: string = '';
  image: string = '';
  answers: string[] = [];
  correctAnswer: string = '';
  score: number = 0;
  showAnswer: boolean = false;
  correct: boolean = false;
  questions: any;
  images: any;
  numQuestion: number = 0;

  constructor(private triviaService: TriviaService) {}

  getQuestions() {
    let selectElement = document.getElementById('category') as HTMLSelectElement;

    if (selectElement) {
      this.category = selectElement.options[selectElement.selectedIndex].text;
      this.categoryNumber = selectElement.options[selectElement.selectedIndex].value;

      this.triviaService.getQuestions(this.categoryNumber).subscribe(data => {
        this.gameStarted = true;

        this.questions = data.questions;

        // console.log(data.questions);

        this.triviaService.getImage(this.category).subscribe(dataImg => {
          this.images = dataImg.photos;
          this.updateQuestion();
        });
      });
    }
  }

  updateQuestion() {
    this.showAnswer = false;

    if(this.numQuestion < 5) {
      this.question = this.questions[this.numQuestion].question;
      this.correctAnswer = this.questions[this.numQuestion].correctAnswers;
      this.answers = this.questions[this.numQuestion].incorrectAnswers;
  
      // Agrego la respuesta correcta en una posicion aleatoria
      this.answers.splice(Math.floor(Math.random() * 4), 0, this.questions[this.numQuestion].correctAnswers);
      
      // this.triviaService.getImage(this.category).subscribe(data => {
        this.image = this.images[this.numQuestion].src.original;
        console.log(this.images)
      // });
  
      this.numQuestion++;
    }
    else {
      this.gameOver = true;
    }
  }

  check(answer: string) {
    if (answer == this.correctAnswer) {
      this.score += 10;
      this.correct = true;
    }
    else {
      this.correct = false;
    }

    this.showAnswer = true;
  }

  restartGame() {
    this.gameStarted = false;
    this.numQuestion = 0;
    this.gameOver = false;
    this.score = 0;
  }
}
