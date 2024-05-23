import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { collection, collectionData, Firestore, Timestamp, query, orderBy } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { FirebaseService, Message } from '../services/firebase.service';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  login: boolean = false;
  messages = [];
  newMessage = '';
  emailActual = '';
  loginsCollection: any[] = [];
  sub!: Subscription;
  authSvc = inject(FirebaseService);

  constructor(public auth: Auth, private firestore: Firestore) {
    // this.login = this.fireSvc.getLocalStorage('user');
  }
  ngOnInit(): void {
    this.authSvc.user$.subscribe(user => {
      if (user) {
        this.authSvc.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
        this.emailActual = user.email;
        this.login = true;
        this.GetData();
      }
      else {
        this.authSvc.currentUserSig.set(null);
      }
      console.log(this.authSvc.currentUserSig());
    });
  }

  guardarMensaje() {
    try {
      const user = this.authSvc.currentUserSig();
      if (user) {
        const mnsj: Message = {
          email: user.email,
          nombre: user.username,
          fecha: Timestamp.fromDate(new Date()),
          mensaje: this.newMessage
        }
        this.authSvc.setDocument(mnsj, 'mensajes').then(() => {
          this.messages.push(mnsj);
          this.newMessage = '';
        });
      }
      else {
        console.error('no hay usuario logueado');
      }

    } catch (error) {
      console.log(error);
    }
  }


  GetData() {
    let col = collection(this.firestore, 'mensajes');
    const consulta = query(col, orderBy('fecha', 'asc'));

    const observable = collectionData(consulta);

    this.sub = observable.subscribe((respuesta: any) => {
      this.messages = respuesta;
      console.log(respuesta);
    })

  }
}
