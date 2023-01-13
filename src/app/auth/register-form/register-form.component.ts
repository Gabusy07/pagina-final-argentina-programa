import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { LoginSuccessGuard } from 'app/guards/login-success.guard';
import { User } from 'app/model/User';
import { AuthService } from 'app/services/http/auth.service';
import { UserService } from 'app/services/http/User.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  
  @Output() onCloseRegisterEvent = new EventEmitter<boolean>();

  constructor( private router: Router, private readonly formBuilder : FormBuilder ,
     private readonly _userHTTP: UserService,
     private readonly _authHTTP:AuthService,
     private loginGuard: LoginSuccessGuard) {
    this.openedForm = true;
    this.form = this.initForm();
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

  //metodos en html
  public submitSignIn(){
  //crea un usuario con los valores del formgroup
    const user = this.form.value;
    const u = new User();
    u.user(user.name, user.lastname, user.nickname, user.email, user.password, user.getRol);
    this.saveUser(u);
  }


  //--------------------------------------------------------
  //CRUD

  private saveUser(u:User):void{
  //  llama al servicio que conecta con el servidor
    this._userHTTP.createUser(u).subscribe({
      next: () => {
        swal({
          title: "Registrado!",
          text: "Usuario registrado con exito en la base de datos",
          icon: "success",
          timer: 3000,
        })
    },
      error: () => {
        swal({
          title: "Error!",
          text: "No se ha podido registrar el usuario",
          icon: "error",
          timer: 3000,
        });
        setTimeout(() => window.location.reload(), 3500 );
      },
      complete: ()=>  this.logAfterRegister(u) //una vez hecho el registro logea al usuario para guardar el token
      //en local storage
    });
  }

  logAfterRegister(u:User){
    this._authHTTP.LoginUser(u).subscribe({
      next: data => {
        let token =  data.token;
        if(token == "FAIL"){
          swal({
            title: "Error en sistema",
            text: "Ha occurrido un error al ingresar al sistema",
            icon: "error",  
          });
          setTimeout(() => window.location.reload(), 3500 );
        }else{
            localStorage.setItem("token",token);
            //this.loginGuard.isUserLogged()
            setTimeout(()=> this.router.navigate(['admin/home']), 500 )
          }
        },
        error: error => {
          swal({
            title: "Error en sistema",
            text: "Ha occurrido un error al ingresar al sistema",
            icon: "error",  
          });
          setTimeout(() => window.location.reload(), 3500 );                   
        },
       }
    )
  }


  //--------------------------------------------------------
  //atributos
  private a:any;
  private openedForm: boolean;
  public form: FormGroup;

}