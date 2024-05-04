import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  newEmail: string = '';
  newPass: string = '';

  loggedUser: string = '';
  errorMsg: string = '';

  constructor(public auth: Auth) {}

  Register() {
    createUserWithEmailAndPassword(this.auth, this.newEmail, this.newPass)
      .then(res => {
        if(res.user.email !== null) {
          this.loggedUser = res.user.email; 
        }
      })
      .catch(err => {
        console.log(err.code);

        /*
        
        */

        switch(err.code) {
          case 'auth/invalid-email': 
            this.errorMsg = 'El correo electronico no es valido.';
            break;

          case 'auth/missing-password': 
            this.errorMsg = 'La contraseña no es valida.';
            break;
            
          case 'auth/email-already-in-use': 
            this.errorMsg = 'El correo electronico ya esta en uso.';
            break;

          case 'auth/weak-password': 
            this.errorMsg = 'La contraseña debe tener al menos 6 caracteres.';
            break;
        }
      })
  }
}
