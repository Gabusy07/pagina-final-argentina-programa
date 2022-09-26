import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @Output() onCloseEvent = new EventEmitter<boolean>();

  constructor( private router: Router, private readonly formBuilder : FormBuilder ) {
    this.openedForm = true;
    this.form = this.initForm();
    
   }

  ngOnInit(): void {
    
  }

  //construccion del reactiveForm
  initForm(): FormGroup{
    return this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(18)]],
    })

  }

  get Email(){
    return this.form.get('login_email');
  }

  get Password(){
    return this.form.get('login_password');
  }


  // revisar para luego cambiar a un metodo post

  submitlogin(){
    this.router.navigate(['home']); // envia formulario y redirige a home

  }

  // cerrar formulario al presionar 'x/close'
 
  closingForm(){
    this.openedForm = false;
    this.onCloseEvent.emit(this.openedForm);
  }

  openedForm: boolean;
  
  form: FormGroup;
  


}


