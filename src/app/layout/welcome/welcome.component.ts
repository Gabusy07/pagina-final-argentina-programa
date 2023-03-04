// pagina de bienvenida con opciones para ingresar o registrarse

import {  Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/http/auth.service';
import { StorageService } from 'app/services/storage.service';
import swal from 'sweetalert';
// @ts-ignore
import Typewriter from 't-writer.js';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {



  constructor(private router: Router, private _authSvc: AuthService, private _localStorageSvc: StorageService) {
    this.signUp = false;
    this.login = false;
   }
  


  ngOnInit(): void {
    const target = document.querySelector('.tw')
    const writer = new Typewriter(target, {
      loop: false,
      typeColor: 'white',
      typeSpeed: 200
    })
    
    writer
      .type('BIENVENID@!')
      .rest(700)
      .start()
  }



  // llamada al hacer click en 'ingresar' abre formulario
  logIn(){

    this.login = true
    this.optionSelected = true;
  }

  
  goHome(){

    let token: string =""
    this._authSvc.guestToken().subscribe({
      next: data => {
        token = data.token
        this._localStorageSvc.addTokenToStorage(token);
        this.router.navigate(['home']);
      },
      error: ()=> swal({
        title: "Servidor",
        text: "No se ha podido conectar con el servidor\nPruebe mas tarde",
        icon: "error",
        timer: 3000,
      })
    });
    ;
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


  //_----------------end animation---------------


  optionSelected = false // desabilita los botones al abrir formulario
  signUp : boolean;
  login : boolean;

}


