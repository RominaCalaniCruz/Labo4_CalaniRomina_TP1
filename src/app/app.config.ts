import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), 
    provideFirebaseApp(() => initializeApp({"projectId":"juego-app-web-88ac4","appId":"1:62493888495:web:7abdbb09f6a01e6b6cf01a","storageBucket":"juego-app-web-88ac4.appspot.com","apiKey":"AIzaSyAnQXQhwSTM092I-lbagyoOYwGNCw0w43A","authDomain":"juego-app-web-88ac4.firebaseapp.com","messagingSenderId":"62493888495"})), 
    provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ]
};
