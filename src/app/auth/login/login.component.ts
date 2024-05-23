import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Timestamp } from '@angular/fire/firestore';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from '../../services/firebase.service';
import { Subscription } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatSelectModule, MatProgressSpinnerModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  errorMessage: string;

  hide = true;
  selected = 'ninguno';
  showSpinner = false;

  constructor(private dialog: MatDialog, private router: Router,
    public authSvc: FirebaseService,
    private formBuilder: FormBuilder, public dialogRef: MatDialogRef<LoginComponent>
  ) { }

  onSubmit() {
    if (this.loginForm.valid) {
      this.showSpinner = true;
      const formValues = this.loginForm.getRawValue();
      this.authSvc.inciarSesion(formValues.email, formValues.password).
        subscribe({
          next: () => {
            console.log("inicio sesion");
            this.guardarLog(formValues.email);
            // 
            Swal.fire({
              icon: 'success',
              title: '¡Bienvenido!',
              text: `HOLA ${formValues.email}`,
              showConfirmButton: false,
              timer: 1300
            });
            setTimeout(() => {
              // this.guardarLog2(formValues.email);
              this.showSpinner = false;
              this.closeDialog(true);
              this.router.navigate(['home']);
            }, 1305);
          },
          error: (err) => {
            this.errorMessage = err.code;
            this.showSpinner = false;
            console.log(this.errorMessage);
            Swal.fire({
              icon: 'error',
              title: '¡Ocurrio un error!',
              text: `Contraseña incorrecta`,
            });
          }
        });
    }
  }

  abrirModalRegistro() {
    this.dialogRef.close();
    const registerDialogRef = this.dialog.open(RegisterComponent);
    registerDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['home']);
      }
    });
  }
  guardarLog(email: string) {
    const currentDate = Timestamp.fromDate(new Date());
    const log = {
      user: email,
      date: currentDate,
    };
    this.authSvc.setDocument(log, 'logs_users');
  }


  autocomplete() {
    switch (this.selected) {
      case 'option1':
        this.loginForm.setValue({
          email: 'mica@gmail.com',
          password: '1234567'
        });
        break;
      case 'option2':
        this.loginForm.setValue({
          email: 'cielo@gmail.com',
          password: '123456'
        });
        break;
      case 'option3':
        this.loginForm.setValue({
          email: 'admin@gmail.com',
          password: '123456'
        });
        break;
      default:
        this.loginForm.setValue({
          email: '',
          password: ''
        });
        break;
    }

  }
  closeDialog(success: boolean = false) {
    this.dialogRef.close(success);
  }
  // login() {
  //   if(this.loginForm.valid){

  //     const { email, password } = this.loginForm.value;
  //     this.showSpinner = true;
  //     this.authSvc.signIn(email, password )
  //     .then( (res) =>{
  //       console.log('Login successful, UID:', res.user.uid);
  //       const user = this.usersCollection.find(user=> user.id === res.user.uid);
  //       this.authSvc.saveInLocalStorage('user',user);
  //       // console.log(this.authSvc.currentUser?.email);
  //       // this.authSvc.verUsuarioactual();
  //         console.log("inicio sesion");
  //         this.closeDialog(true);
  //         this.guardarLog();
  //         Swal.fire({
  //           icon: 'success',
  //           title: '¡Bienvenido!',
  //           text: `HOLA ${user.name}`,
  //           showConfirmButton: false,
  //           timer: 1300
  //         });
  //         setTimeout(() => {            
  //           this.router.navigate(['home']);
  //         }, 1305);

  //     }).catch((err)=>{
  //       console.log(err);
  //       Swal.fire({
  //         icon: 'error',
  //         title: '¡Ocurrio un error!',
  //         text: `Contraseña incorrecta`,
  //       });
  //     }).finally(()=>{
  //       this.showSpinner = false;
  //     });

  //   }

  // }
}
