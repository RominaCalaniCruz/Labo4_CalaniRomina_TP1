import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { map } from "rxjs";
import { FirebaseService } from "../../services/firebase.service";

// export function usuarioExisteAsyncValidator(service: FirebaseService): AsyncValidatorFn  {
//     return (control: AbstractControl) => {
//       const email = control.value;
//       return service.TraerUsuarios(email).pipe(
//         map(usuarios => {
//           if (usuarios.length > 0) {
//             return { usuarioExyiste: 'El usuario ya existe' };
//           } 
//           return null;
//         })
//       );
//     };
//   }