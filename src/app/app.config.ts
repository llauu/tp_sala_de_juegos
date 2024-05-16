import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: environment.projectId,
          appId: environment.appId,
          databaseURL: environment.databaseURL,
          storageBucket: environment.storageBucket,
          apiKey: environment.apiKey,
          authDomain: environment.authDomain,
          messagingSenderId: environment.messagingSenderId,
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: environment.projectId,
          appId: environment.appId,
          databaseURL: environment.databaseURL,
          storageBucket: environment.storageBucket,
          apiKey: environment.apiKey,
          authDomain: environment.authDomain,
          messagingSenderId: environment.messagingSenderId,
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    provideHttpClient(),
  ],
};
