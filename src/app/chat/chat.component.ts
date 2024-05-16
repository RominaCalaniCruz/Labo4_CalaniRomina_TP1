import { Component, OnInit } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/compat/database';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{
  messages = [];
  myMessages = [];
  newMessage = '';
  username = '';
  newMessageContent: string = '';
  public loginsCollection:any[] = [];
  private sub!:Subscription;

  constructor(public auth: Auth, private firestore: Firestore) { }

  ngOnInit(): void {
    this.GetData();
  }



  GetData(){
    let col = collection(this.firestore, 'mensajes');
    
    const observable = collectionData(col);

    this.sub = observable.subscribe((respuesta:any) => {

      //Actualizamos nuestro array
      this.messages = respuesta;

      //Actualizamos la cantidad de registros que contiene la colección (Ejemplo propuesto en clase)
      // this.countLogins = this.loginsCollection.length;

      console.log(respuesta);
    })

  }

  // sendMessage(): void {
  //   if (this.newMessageContent.trim() !== '') {
  //     collection('messages').add({
  //       senderName: 'Usuario', // Nombre del usuario actualmente autenticado
  //       content: this.newMessageContent,
  //       timestamp: new Date()
  //     }).then(() => {
  //       this.newMessageContent = '';
  //     }).catch((error) => {
  //       console.error('Error al enviar mensaje:', error);
  //     });
  //   }
  //   const message = {
  //     uid: JSON.parse(localStorage.getItem('user')).id,
  //     username: this.username,
  //     text: this.newMessage,
  //     date: new Date().getTime()
  //   };
  //   this.db.list('messages').push(message);
  //   this.newMessage = '';
  // }
}
