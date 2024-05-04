import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"tp-sala-de-juegos-2541e","appId":"1:284356451192:web:805eeb9ff321a4e53e868d","databaseURL":"https://tp-sala-de-juegos-2541e-default-rtdb.firebaseio.com","storageBucket":"tp-sala-de-juegos-2541e.appspot.com","apiKey":"AIzaSyBeErb_Kvi8Fjmkv4pJHazLtfJGsdAdUoI","authDomain":"tp-sala-de-juegos-2541e.firebaseapp.com","messagingSenderId":"284356451192"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"tp-sala-de-juegos-2541e","appId":"1:284356451192:web:805eeb9ff321a4e53e868d","databaseURL":"https://tp-sala-de-juegos-2541e-default-rtdb.firebaseio.com","storageBucket":"tp-sala-de-juegos-2541e.appspot.com","apiKey":"AIzaSyBeErb_Kvi8Fjmkv4pJHazLtfJGsdAdUoI","authDomain":"tp-sala-de-juegos-2541e.firebaseapp.com","messagingSenderId":"284356451192"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))
  ]
};
