import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { Timestamp } from 'firebase/firestore';
@Component({
  selector: 'app-register',
  standalone: true,
  imports:[MatCardModule,CommonModule,MatProgressSpinnerModule,FormsModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatIconModule,MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  // registerForm: FormGroup;
  showSpinner = false;
  hide = true;
  errorMessage: string;
  registerForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RegisterComponent>,
    private authSvc: FirebaseService,
    private router: Router
  ) {
    // this.registerForm = this.fb.group({
    //   name: ['', [Validators.required]],
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(6)]]
    // }, { validator: this.checkPasswords });
    
  }

  checkPasswords(group: FormGroup) { 
    let pass = group.get('password');
    let confirmPass = group.get('confirmPassword');
    return pass === confirmPass ? null : { notSame: true }
  }


  onSubmit(){
    if(this.registerForm.valid){
      this.showSpinner = true;
      const formValues = this.registerForm.getRawValue();
      console.log(formValues);
      this.authSvc.crearUsuario(formValues.name, formValues.email,formValues.password)
      .subscribe({
          next: ()=>{ 
            // this.closeDialog(true);
            this.guardarLog(formValues.email);
            this.showSpinner = false;
            console.log('registro exito');
            Swal.fire({
              icon: 'success',
              title: '¡Bienvenido!',
              text: `Hola ${formValues.name}`,
              showConfirmButton: false,
              timer: 1300
            });
            setTimeout(() => {            
              this.closeDialog(true);
              this.router.navigate(['home']).then(() => {
                window.location.reload();
              });
            }, 1305);
          },
          error: (err)=>{
            this.errorMessage = err.code;
            if(err.code === 'auth/email-already-in-use'){

              this.showSpinner = false;
              console.log('error'+this.errorMessage);
              Swal.fire({
                icon: 'error',
                title: '¡Email en uso!',
                text: `Ese correo ya esta en uso, intenta con otro o inicia sesion.`
              });
              this.registerForm.reset();
            }
            else{
              this.showSpinner = false;
              console.log('error'+this.errorMessage);
              Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: this.errorMessage
              });
            }
          }
          
        });
    }
  }
  guardarLog(email:string){
    const currentDate = Timestamp.fromDate(new Date());
    const log = {
      user: email,
      date: currentDate,
    };
    this.authSvc.setDocument(log,'logs_users');    
  }
  guardarUsuario(email:string){
    const currentDate = Timestamp.fromDate(new Date());
    const log = {
      user: email,
      date: currentDate,
    };
    this.authSvc.setDocument(log,'logs_users');    
  }

  register() {
    if (this.registerForm.valid) {
      const { email, password , name} = this.registerForm.value;
      this.showSpinner = true;
      this.authSvc.registerUser(email, password)
        .then((res) => {
          console.log('Registration successful, UID:', res.user.uid);
          const user = { id: res.user.uid, email }; 
          Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: `HOLA ${email}`,
            showConfirmButton: false,
            timer: 1300
          });
          setTimeout(() => {
            this.closeDialog(true);  // Indicar que el registro fue exitoso
          }, 1305);
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: '¡Ocurrió un error!',
            text: 'Error en el registro',
          });
        })
        .finally(() => {
          this.showSpinner = false;
        });
    }
  }

  closeDialog(success: boolean = false) {
    this.dialogRef.close(success);
  }

}
