import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'tp_sala_de_juegos';
  user: string | null | undefined = '';
  isLoggedIn: boolean = false;
  faUser = faUser;

  constructor(public authService: AuthService, private router: Router) {
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
}
