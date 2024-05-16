import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { FirebaseService, User } from '../../services/firebase.service';
// import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { addDoc, collection, collectionData } from '@angular/fire/firestore';

// import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { MatDialogRef } from '@angular/material/dialog';

// import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { FirebaseService, User } from '../../services/firebase.service';
import { Subscription } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  hide = true;
  selected = 'ninguno';
  showSpinner = false;
  public usersCollection:any[] = [];
  private sub!:Subscription;
  // firebaseSvc = inject(FirebaseService);
  constructor(private firestore: Firestore,public authSvc: FirebaseService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<LoginComponent>) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.GetData();
  }
  userMail: string = "";
  userPWD: string = "";
  // selected: string;
  loggedUser: string = "";

  GetData(){
    let col = collection(this.firestore, 'users');
    
    const observable = collectionData(col);

    this.sub = observable.subscribe((respuesta:any) => {

      //Actualizamos nuestro array
      this.usersCollection = respuesta;

      //Actualizamos la cantidad de registros que contiene la colección (Ejemplo propuesto en clase)
      // this.countLogins = this.loginsCollection.length;

      console.log(this.usersCollection);
    })

  }

  login() {
    if(this.loginForm.valid){
      
      const { email, password } = this.loginForm.value;
      this.showSpinner = true;
      this.authSvc.signIn(email, password )
      .then( (res) =>{
        // this.showSpinner = false;
        console.log('Login successful, UID:', res.user.uid);
        // this.getUserName(res.user.uid);
        // const username = this.authSvc.getUserNameByUid(res.user.uid);
        
        const user = this.usersCollection.find(user=> user.id === res.user.uid);
        this.authSvc.saveInLocalStorage('user',user);
          console.log("inicio sesion");
          this.closeDialog();
          Swal.fire({
            icon: 'success',
            title: '¡Bienvenido!',
            text: `HOLA ${user.name}`,
          });
      }).catch((err)=>{
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: '¡Ocurrio un error!',
          text: `HOLA ${err}`,
        });
      }).finally(()=>{
        this.showSpinner = false;
      });

    }

  }
  getUser(userId: string) {
    try {
      let path = `users/${userId}`;
      this.authSvc.getDocument(path).then((user: User)=>{
        this.authSvc.saveInLocalStorage('user',user);
        console.log('User Name:', user.name);
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: `HOLA ${user.name}`,
        });
      }).catch((error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo encontrar el nombre del usuario',
        });
        console.error('Error getting user name:', error);
      });
      
    } catch (error) {
      console.error('Error getting user name:', error);
    }
  }
  async getUserName(userId: string) {
    try {
      const user = await this.authSvc.getUserNameById(userId);
      if(user){
        this.authSvc.saveInLocalStorage('user',{
          name: user.name,
          email: user.email,
          uid: user.id
        });
        // this.authSvc.saveInLocalStorage('user', user);
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: `HOLA ${user.name}`,
        });
        console.log('User data saved to localStorage:', user);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo encontrar el nombre del usuario',
        });
      }
      console.log('User Name:', user.name);
    } catch (error) {
      console.error('Error getting user name:', error);
    }
  }
  autocomplete() {
    switch (this.selected) {
      case 'option1':
        this.userMail = 'diego@gmail.com';
        this.userPWD = 'jugador1';
        break;
      case 'option2':
        this.userMail = 'victor@gmail.com';
        this.userPWD = 'jugador2';
        break;
      case 'option3':
        this.userMail = 'admin@admin.com';
        this.userPWD = '123456';
        break;
      default:
        this.userMail = '';
        this.userPWD = '';
        break;
    }
    
  }
  closeDialog() {
    this.dialogRef.close();
  }
  // login() {
  //   if (this.loginForm.valid) {
  //   const { email, password } = this.loginForm.value;
  //   this.authService.login(email,password)
  //     .then(() => {
  //       // Redirigir al usuario después de iniciar sesión
  //     })
  //     .catch(error => {
  //       // Manejar errores de inicio de sesión
  //     });
  //   }
  // }
  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     this.showSpinner = true;
  //     this.firebaseSvc.signIn(this.loginForm.value as User)
  //       .then((userCredential) => {
  //         // El inicio de sesión fue exitoso
  //         const user = userCredential.user; 
  //         console.log('Inicio de sesión exitoso', userCredential);
  //         Swal.fire({
  //           icon: 'success',
  //           title: '¡Bienvenido!',
  //           text: `HOLA ${this.loginForm.get('email')}`,
  //         });
  //       })
  //       .catch((error) => {
  //         // Hubo un error en el inicio de sesión
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Error',
  //           text: error
  //         })
  //         console.error('Error al iniciar sesión', error);
  //       })
  //       .finally(()=>{
  //         this.showSpinner = false;
  //       })
  //       ;
  //   }
  // }
}
