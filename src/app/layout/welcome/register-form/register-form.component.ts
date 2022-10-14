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

  constructor( private router: Router, private readonly formBuilder : FormBuilder , private readonly httpSvc: UserService) {
    this.openedForm = true;
    this.form = this.initForm();
    this.registeredUser = false;
    
   }

  ngOnInit(): void {

    
  }

  //formulario
  //construccion del reactiveForm
  public initForm(): FormGroup{
    return this.formBuilder.group({
      nickname: ['',[Validators.required, Validators.pattern("^[A-Za-z]\\w*$"), Validators.minLength(5), Validators.maxLength(12)]],
      name: ['',[Validators.required ,Validators.pattern('^[a-zA-ZÀ-ÿ \u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ \u00f1\u00d1]*)*[a-zA-ZÀ-ÿ \u00f1\u00d1]+$'), Validators.minLength(1), Validators.maxLength(50)]],
      lastname: ['',[Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ \u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ \u00f1\u00d1]*)*[a-zA-ZÀ-ÿ \u00f1\u00d1]+$') , Validators.minLength(1), Validators.maxLength(50)]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(18)]],
    })

  }
  

  public get Name(){
    return this.form.get('name');
  }

  public get Lastname(){
    return this.form.get('lastname');
  }

  public get Email(){
    return this.form.get('email');
  }

  public get Password(){
    return this.form.get('password');
  }

  public get Nickname(){
    return this.form.get('nickname');
  }



  // revisar para luego cambiar a un metodo post

  public submitSignIn(){
    // envia formulario y redirige a home
    this.saveUser()
    console.log(this.a)
    /*
    if (this.registeredUser) this.router.navigate(['home']); 
    else setTimeout(() => window.location.reload(), 550 ) ;*/
    
    

  }

  // cerrar formulario al presionar 'x/close'
 
  public closingForm(){
    this.openedForm = false;
    this.onCloseRegisterEvent.emit(this.openedForm);
  }

  //--------------------------------------------------------
  //CRUD

  private saveUser():void{

    //crea un usuario con los valores del formgroup y llama al servicio que conecta con el servidor

    const user = this.form.value;
    const u = new User();
    u.user(user.name, user.lastname, user.nickname, user.email, user.password);

    this.a = this.httpSvc.createUser(u).subscribe({
      next: data => {setTimeout (() => alert ("usuario guardado con exito"), 500),
      this.registeredUser = true; // permite la navegacion a home
    },
      error: data => alert (data),
    });


  }


  //--------------------------------------------------------
  //atributos
  private a:any;
  private openedForm: boolean;
  private registeredUser: boolean;
  public form: FormGroup;

}
