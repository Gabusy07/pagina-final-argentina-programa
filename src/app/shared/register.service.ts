import { Injectable } from '@angular/core';
import { FormControl } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() {
    this.formOpen = false;
   }
// cambia el estado del formulario
  openingForm(): void{
    console.log("antes"+this.formOpen);
    this.formOpen = this.formOpen ? false : true;
    console.log("despues"+this.formOpen);
  }

 getFormOpen () : boolean {
  return this.formOpen;
 }


  formOpen: boolean;

  }