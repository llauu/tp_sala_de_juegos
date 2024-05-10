import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faComments, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgFor, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, addDoc, collection, collectionData, orderBy, query } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FontAwesomeModule, NgFor, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'tp_sala_de_juegos';
  user: string | null | undefined = '';
  isLoggedIn: boolean = false;
  showChatWindow: boolean = false;
  faUser = faUser;
  faComment = faComments;
  faTimes = faTimes;
  messages: any[] = [];
  messageText: string = '';
  sub: Subscription | null = null;

  constructor(public authService: AuthService, private router: Router, private firestore: Firestore) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkAuthState();
      }
    });
  }
  
  checkAuthState() {
    this.authService.isAuthenticated()
      .then(res => {
        this.isLoggedIn = res;
        this.user = this.authService.getUser();
        this.getMessages();
      })
      .catch(err => console.log(err));
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.isLoggedIn = false;
        this.router.navigate(['/login'])
      })
      .catch(err => console.log(err));
  }


  toggleChatWindow() {
    setTimeout(() => {
      this.scrollToBottom();
    }, 0);
    this.showChatWindow = !this.showChatWindow;
  }

  sendMessage() {
    if(this.messageText !== '') {
      let col = collection(this.firestore, 'messages');
      addDoc(col, {'date': new Date(), 'user': this.user, 'message': this.messageText});

      this.messageText = '';
    }
    
  }

  getMessages() {
    let col = collection(this.firestore, 'messages');
    const orderQuery = query(col, orderBy('date', 'asc'));

    this.messages = [];
    const observable = collectionData(orderQuery);

    this.sub = observable.subscribe((res: any) => {
      this.messages = res;
      
      // Cada vez que haya un nuevo mensaje, envio el scroll hacia abajo de todo
      setTimeout(() => {
        this.scrollToBottom();
      }, 0);
    });
  }

  formatUser(user: string): string {
    return user.split('@')[0];
  }

  formatTimestamp(timestamp: any): string {
    const date = timestamp.toDate(); 
    return formatDate(date, 'd MMM. y h:mm a', 'en-US'); 
  }

  
  scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
}
