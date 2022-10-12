import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'app/model/User';
import { UserService } from 'app/services/http/User.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @Output() onCloseLogingEvent = new EventEmitter<boolean>();

  constructor( private router: Router,
    private readonly formBuilder : FormBuilder,
    private readonly   userSvc: UserService) {
    this.openedForm = true;
    this.form = this.initForm();
    this.loggedinUser = false;
    
   }

  ngOnInit(): void {
    
  }

  //construccion del reactiveForm
  private initForm(): FormGroup{
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

  public submitlogin(){

    // envia formulario y redirige a home
    this.login_user()
    if (this.loggedinUser) this.router.navigate(['home']); 
    else { alert("usuario o contraseña incorrecta");
           setTimeout(() => window.location.reload(), 550 ) ;
    }

    console.log(this.a)

  }

  // cerrar formulario al presionar 'x/close'
 
 public closingForm(){
    this.openedForm = false;
    this.onCloseLogingEvent.emit(this.openedForm);
  }


  // llamado a servicio de conexion a servidor

  private login_user(){
    const userForm = this.form.value;
    const user: User = new User();

    //asigna los valores del form formGroup
    user.setEmail(userForm.email);
    user.setPassword(userForm.password);

    this.a = this.userSvc.LoginUser(user).subscribe({
      next: data => {setTimeout (() => alert ("ingreso exitoso"), 500),
      this.loggedinUser = true; // permite la navegacion a home
    },
      error: data => alert ("error en conexion al servidor")
    })
  }






  private a: any;
  private openedForm: boolean;
  private loggedinUser: boolean;
  public form: FormGroup;
  


}


