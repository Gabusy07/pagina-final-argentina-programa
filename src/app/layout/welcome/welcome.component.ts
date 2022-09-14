// pagina de bienvenida con opciones para ingresar o registrarse


import {  Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() {
    this.signIn = false;
   }
  


  ngOnInit(): void {
    

  }

  // llamada al hacer click en 'ingresar'
  enterHome(){
    this.signIn = true
    this.optionSelected = true;
  }

  

  // llamada al hacer click en 'registrar
  register () {
    this.signUp = true;
  }

// cerrar formulario en el welcome a partir del atributo 'closedForm' del child 'RegisterForm-Component'
closeForm($event: boolean){
  this.signIn = $event;
  this.optionSelected = false
  
}

  // atributos para registrar y registrado
  optionSelected = false // desabilita los botones al abrir formulario
  signIn : boolean;
  signUp : boolean = false;

}


