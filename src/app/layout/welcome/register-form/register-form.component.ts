import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { User } from 'app/model/User';
import { UserService } from 'app/services/http/User.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  
  @Output() onCloseRegisterEvent = new EventEmitter<boolean>();

  constructor( private router: Router, private readonly formBuilder : FormBuilder , private readonly httpSVC: UserService) {
    this.openedForm = true;
    this.form = this.initForm();
    
   }

  ngOnInit(): void {
    
  }

  //construccion del reactiveForm
  initForm(): FormGroup{
    return this.formBuilder.group({
      nickname: ['',[Validators.required, Validators.pattern('[/^[a-z][a-z]+\d*$|^[a-z]\d\d+$/i]')]],
      name: ['',[Validators.required ,Validators.pattern('[a-zA-Z ]*'), Validators.minLength(1), Validators.maxLength(50)]],
      lastname: ['',[Validators.required, Validators.pattern('[a-zA-Z ]*') , Validators.minLength(1), Validators.maxLength(50)]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(18)]],
    })

  }
  

  get Name(){
    return this.form.get('name');
  }

  get Lastname(){
    return this.form.get('lastname');
  }

  get Email(){
    return this.form.get('email');
  }

  get Password(){
    return this.form.get('password');
  }

  get Nickname(){
    return this.form.get('nickname');
  }



  // revisar para luego cambiar a un metodo post

  submitSignIn(){
    // envia formulario y redirige a home
    this.router.navigate(['home']); 
    this.saveUser()

  }

  // cerrar formulario al presionar 'x/close'
 
  closingForm(){
    this.openedForm = false;
    this.onCloseRegisterEvent.emit(this.openedForm);
  }

  saveUser():void{

    //crea un usuario con los valores del formgroup y llama al servicio que conecta con el servidor backend

    const user = this.form.value;
    const u = new User(user.name, user.lastname, user.nickname, user.email, user.password)
    this.httpSVC.createUser(u).subscribe(data => alert ("usuario guardado con exito"))
  }

  openedForm: boolean;
  
  form: FormGroup;
  


}
