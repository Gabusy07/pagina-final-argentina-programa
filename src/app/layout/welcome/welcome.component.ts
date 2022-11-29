// pagina de bienvenida con opciones para ingresar o registrarse


import {  Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() {
    this.signUp = false;
    this.login = false;
   }
  


  ngOnInit(): void {
    

  }

  // llamada al hacer click en 'iniciar sesión' abre formulario
  enterHome(){
    this.login = true
    this.optionSelected = true;
  }

  

  // llamada al hacer click en 'registrar' abre formularip
  register () {
    this.signUp = true;
    this.optionSelected = true;
  }

  goHomeAsGuess(){
  }

// cerrar formulario en el welcome a partir del atributo 'closedRegisterForm' del child 'RegisterForm-Component'
closeRegisterForm($event: boolean){
  this.signUp = $event;
  this.optionSelected = false
  
}

// cerrar formulario en el welcome a partir del atributo 'closedLoginForm' del child 'LoginForm-Component'
closeLoginForm($event: boolean){
  this.login = $event;
  this.optionSelected = false
  
}


  // atributos para registrar y registrado
  optionSelected = false // desabilita los botones al abrir formulario
  signUp : boolean;
  login : boolean;

}


