// import{ getFirestore, setDoc , doc ,getDoc }  from '@angular/fire/firestore';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {  addDoc, collection, Firestore, Timestamp} from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword,signOut, user } from '@angular/fire/auth';
import { updateProfile } from 'firebase/auth';
import { Observable, from } from 'rxjs';

// export interface User{
//   id: string,
//   email: string,
//   password: string,
//   name: string
// }
export interface User{
  email: string,
  username: string
}
export interface Message{
  email: string,
  nombre: string,
  fecha: Timestamp,
  mensaje: string
}
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  auth = inject(Auth);
  user$ = user(this.auth);
  currentUserSig = signal<User | null | undefined>(undefined);
  router = inject(Router);
  constructor(private firestore: Firestore) { 
    // this.user$ = this.auth.authState;
  }
  crearUsuario(username:string,email: string,password:string):Observable<void>{
    const promise = createUserWithEmailAndPassword(this.auth,email,password)
    .then((response)=> updateProfile(response.user, {displayName: username}));
    return from(promise);
  }
  inciarSesion(email: string,password:string):Observable<void>{
    const promise = signInWithEmailAndPassword(this.auth,email,password).then(()=>{});
    return from(promise);
  }
  cerrarSesion(){
    return signOut(this.auth);
  }

  //----no lo uso--------------
  setDocument(obj: any, nombreCol: string){
    return addDoc(collection(this.firestore, nombreCol), obj);
  }
  async signIn(email: string, password: string) {
    
    return await signInWithEmailAndPassword(this.auth, email, password);
  }
  async registerUser(email: string, password: string){
    return await createUserWithEmailAndPassword(this.auth, email, password);
  } 
  //--------------- NO SIRVE---------------------------
  // async getUserNameById(userId: string): Promise<User> {
  //   try {
  //     const userDocRef = doc(this.firestore, 'users', userId);
  //     const userDoc = await getDoc(userDocRef);

  //     if (userDoc.exists) {
  //       const userData = userDoc.data() as User;
  //       return userData;
  //     } else {
  //       console.error('User document not found');
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user name: ', error);
  //     throw error;
  //   }
  // }

  // CloseSession(){
  //   signOut(this.auth).then(() => {
  //     this.routerLink('/home');
  //     localStorage.removeItem('user');
  //   })
    
  // }
  // saveInLocalStorage(key: string, value: any){
  //   return localStorage.setItem(key, JSON.stringify(value));
  // }
  // getLocalStorage(key: string){
  //   return JSON.parse(localStorage.getItem(key)) ;
  // }
  // routerLink(url: string){
  //   return this.router.navigateByUrl(url);
  // }
  // async getDocument(path: string){
  //   return (await getDoc(doc(getFirestore(), path))).data();
  // }
  
}
