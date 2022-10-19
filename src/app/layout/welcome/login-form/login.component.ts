
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from 'app/model/Token-interface';
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
    private readonly userSvc: UserService) {
    this.openedForm = true;
    this.form = this.initForm();
    
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
    return this.form.get('email');
  }

  get Password(){
    return this.form.get('password');
  }



  public submitlogin(){
    //funcion fijada en el html

  this.login_user();

  }

  // cerrar formulario al presionar 'x/close'
 
 public closingForm(){
    this.openedForm = false;
    this.onCloseLogingEvent.emit(this.openedForm);
  }


  // llamado a servicio de conexion a servidor

  public login_user(){
    const userForm = this.form.value;
    const user: User = new User();

    //asigna los valores del form formGroup
    user.setEmail(userForm.email);
    user.setPassword(userForm.password);


    this.userSvc.LoginUser(user).subscribe({

     next: data => {
      let token =  data.token;
      if(token == "FAIL"){
        alert ("ha ocurrido un error");
        setTimeout(() => window.location.reload(), 550 );

      }else{
          localStorage.setItem("token",token);
          this.router.navigate(['home']);
        }
      },
      error: error => {
        alert ("ha ocurrido un error");
        setTimeout(() => window.location.reload(), 550 );
                       
      }
     }
        
    )
        
  }
  




  logged_user:User = new User();
 
  private openedForm: boolean;
  public form: FormGroup;
  


}


