import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { addDoc, collection } from 'firebase/firestore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  loginsCollections: any[] = [];
  email: string = '';
  pass: string = '';
  loggedUser: string = '';
  errorMsg: string = '';

  constructor(private firestore: Firestore, public auth: Auth) {

  }

  Login() {
    signInWithEmailAndPassword(this.auth, this.email, this.pass)
      .then(res => {
        if(res.user.email !== null) {
          this.loggedUser = res.user.email;

          // Registro login en la coleccion registros
          let col = collection(this.firestore, 'logins');
          addDoc(col, {'date': new Date(), 'user': this.email});
        }
      })
      .catch(err => {
        console.log(err.code);
        
        switch(err.code) {
          case 'auth/invalid-email': 
            this.errorMsg = 'El correo electronico no es valido.';
            break;

          case 'auth/missing-password': 
            this.errorMsg = 'La contraseña no es valida.';
            break;
            
          case 'auth/invalid-credential': 
            this.errorMsg = 'El correo electronico o contraseña son incorrectos.';
            break;
        }
      });

  }



  // GetData() {
  //   let col = collection(this.firestore, 'logins');

  //   const observable = collectionData(col);

  //   observable.subscribe((respuesta) => {
  //     this.loginsCollections = respuesta;

  //     this.countLogins = this.loginsCollections.length;

  //     console.log(respuesta);
  //   })

  // }
}
