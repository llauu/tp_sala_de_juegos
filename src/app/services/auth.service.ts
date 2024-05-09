import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth : Auth) {
    
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      this.auth.onAuthStateChanged(user => {
        return user ? res(true) : res(false);
      });
    });
  }

  getUser() {
    return this.auth.currentUser?.email;
  }
}
