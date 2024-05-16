import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { getFirestore, setDoc , doc ,getDoc, addDoc, collection,collectionData, Firestore} from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential ,signOut } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { Subscription } from 'rxjs';

export interface User{
  id: string,
  email: string,
  password: string,
  name: string
}

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  constructor(private auth: Auth, private firestore: Firestore) { }

  // private sub!:Subscription;
  // afAuth = inject(AngularFireAuth);
  // firestore = inject(AngularFirestore);
  // utilsSvc = inject(UtilsService);
  router = inject(Router);

  async signIn(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }
  async signUp(email: string, password: string, name: string) {
    try {
      // Crear el usuario en Firebase Authentication
      const userCredential: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      
      // Obtener el UID del usuario recién creado
      const uid = userCredential.user?.uid;
      
      // Verificar si se obtuvo el UID
      if (!uid) {
        throw new Error('User UID is not available');
      }

      // Crear el objeto User
      const user: User = {
        id: uid,
        email: email,
        password: password, // Nota: No es recomendable guardar contraseñas en texto claro
        name: name
      };

      // Guardar el usuario en Firestore
      await setDoc(doc(this.firestore, 'users', uid), {
        id: user.id,
        email: user.email,
        name: user.name
        // No guardar la contraseña en Firestore
      });

      // Redirigir al usuario o realizar alguna otra acción después del registro
      this.router.navigate(['/welcome']); // Reemplaza '/welcome' con la ruta que prefieras

    } catch (error) {
      console.error('Error registrando usuario: ', error);
      throw error; // Lanzar el error para que pueda ser manejado por el componente que llama a este método
    }
  }
 
  // GetData() {
  //   let col = collection(this.firestore, 'logins');
  //   const observable = collectionData(col);

  //   this.sub = observable.subscribe((respuesta: any) => {
  //     this.loginsCollection = respuesta;
  //     console.log('Logins Collection:', this.loginsCollection);
  //   });
  // }

  // getUserNameByUid(uid: string): string | null {
  //   const user = this.loginsCollection.find(user => user.id === uid);
  //   return user ? user.name : null;
  // }

  async getDocument(path: string){
    return (await getDoc(doc(getFirestore(), path))).data();
  }
  async getUserNameById(userId: string): Promise<User> {
    try {
      const userDocRef = doc(this.firestore, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists) {
        const userData = userDoc.data() as User;
        return userData;
      } else {
        console.error('User document not found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user name: ', error);
      throw error;
    }
  }
  CloseSession(){
    signOut(this.auth).then(() => {
      console.log(this.auth.currentUser?.email);
      this.routerLink('/home');
      localStorage.removeItem('user');
    })

  }
  saveInLocalStorage(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value));
  }
  getLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key)) ;
  }
  // async loginUser(email: string, password: string) {
  //   return this.auth.signInWithEmailAndPassword(email, password);

  // }
  // async getDocument(path: string): Promise<User | null>{
    // return (await getDoc(doc(getFirestore(), path))).data();
    // const docSnap = await getDoc(doc(getFirestore(), path));
    // if (docSnap.exists()) {
    //   return docSnap.data() as User;
    // } else {
    //   return null;
    // }
  // }
  //login
  // signIn(user: User){
  //   return this.auth.signInWithEmailAndPassword(user.email,user.password);
  // }
  // signUp(user: User){
  //   return createUserWithEmailAndPassword(getAuth(), user.email,user.password);
  // }
  
  // signOut(){
  //   getAuth().signOut();
  //   localStorage.removeItem('user');
  //   this.routerLink('/auth');
  // }
  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }
  
}
