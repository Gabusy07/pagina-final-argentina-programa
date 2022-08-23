// pagina de bienvenida con opciones para ingresar o registrarse


import { Component, OnInit } from '@angular/core';
import { RegisterService } from '@shared/register.service';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  // descarga de servicio

  constructor(private formService: RegisterService) {
    this.signIn = this.formService.formOpen;
   }

  ngOnInit(): void {
    

  }

  // llamada al hacer click en 'ingresar'
  enterHome(){
    this.formService.openingForm();
    this.signIn = this.formService.getFormOpen(); //recibe del servicio si esta  desplegado el formulario
    this.optionSelected = true;
  }

  // llamada al hacer click en 'registrar
  register () {
    this.signUp = true;
  }

  // atributos para registrar y registrado
  optionSelected = false // desabilita los botones al abrir formulario
  signIn : boolean;
  signUp : boolean = false;

}


