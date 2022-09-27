import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  
  @Output() onCloseRegisterEvent = new EventEmitter<boolean>();

  constructor( private router: Router, private readonly formBuilder : FormBuilder ) {
    this.openedForm = true;
    this.form = this.initForm();
    
   }

  ngOnInit(): void {
    console.log(this.form.value)
    
  }

  //construccion del reactiveForm
  initForm(): FormGroup{
    return this.formBuilder.group({
      user: ['',[Validators.required, Validators.pattern('^[a-z0-9_-]{3,16}$')]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(18)]],
    })

  }

  get Email(){
    return this.form.get('email');
  }

  get Password(){
    return this.form.get('password');
  }

  get User(){
    return this.form.get('user');
  }

  get Name(){
    return this.form.get('name');
  }

  // revisar para luego cambiar a un metodo post

  submitSignIn(){
    this.router.navigate(['home']); // envia formulario y redirige a home

  }

  // cerrar formulario al presionar 'x/close'
 
  closingForm(){
    this.openedForm = false;
    this.onCloseRegisterEvent.emit(this.openedForm);
  }

  openedForm: boolean;
  
  form: FormGroup;
  


}
