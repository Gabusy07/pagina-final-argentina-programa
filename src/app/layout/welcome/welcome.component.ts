// pagina de bienvenida con opciones para ingresar o registrarse


import {  Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router) {
    this.signIn = false;
    this.login = false;
   }
  


  ngOnInit(): void {
    

  }

  // llamada al hacer click en 'ingresar' abre formulario
  logIn(){
    this.login = true
    this.optionSelected = true;
  }

  goHome(){
  }

  

  // llamada al hacer click en 'registrar' abre formularip
  register () {
    this.signIn = true;
    this.optionSelected = true;
  }

// cerrar formulario en el welcome a partir del atributo 'closedRegisterForm' del child 'RegisterForm-Component'
closeRegisterForm($event: boolean){
  this.signIn = $event;
  this.optionSelected = false
  
}

// cerrar formulario en el welcome a partir del atributo 'closedLoginForm' del child 'LoginForm-Component'
closeLoginForm($event: boolean){
  this.login = $event;
  this.optionSelected = false
  
}


  // atributos para registrar y registrado
  optionSelected = false // desabilita los botones al abrir formulario
  signIn : boolean;
  login : boolean;

}


