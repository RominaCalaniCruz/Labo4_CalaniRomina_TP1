import { Component, OnInit, ElementRef,ViewChild,AfterViewChecked  } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/compat/database';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, collectionData, Firestore, Timestamp , query, orderBy} from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { FirebaseService, Message } from '../services/firebase.service';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,FormsModule,MatButtonModule,MatIconModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messageContainer') messageContainer: ElementRef | undefined;

  messages = [];
  myMessages = [];
  newMessage = '';
  username = '';
  newMessageContent: string = '';
  public loginsCollection:any[] = [];
  private sub!:Subscription;
  
  constructor(private fireSvc : FirebaseService,public auth: Auth, private firestore: Firestore) { }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  ngOnInit(): void {
    this.GetData();
    const user = this.fireSvc.getLocalStorage('user');
    if(user){
      
      this.username = user.name;
    }
  }
  scrollToBottom(): void {
    setTimeout(() => {
    if (this.messageContainer) {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    }
  });
  }
  guardarMensaje(){
    try {
      const user = this.fireSvc.getLocalStorage('user');
      if(user){
        const mnsj: Message = {
          nombre: user.name,
          fecha: Timestamp.fromDate(new Date()),
          mensaje: this.newMessage
        }
        this.fireSvc.setDocument(mnsj).then(()=>{
          this.messages.push(mnsj);
          this.newMessage='';
        });
        this.scrollToBottom();

      }
      else{
        console.error('no hay nada guardado en local');
      }
      
    } catch (error) {
      console.log(error);
    }
  }


  GetData(){
    let col = collection(this.firestore, 'mensajes');
    const consulta = query(col, orderBy('fecha','asc'));

    const observable = collectionData(consulta);

    this.sub = observable.subscribe((respuesta:any) => {

      //Actualizamos nuestro array
      this.messages = respuesta;

      console.log(respuesta);
    })

  }
}
