import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'app/model/User';
import { AuthService } from 'app/services/http/auth.service';
import { StorageService } from 'app/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @Output() onCloseLogingEvent = new EventEmitter<boolean>();

  constructor( private router: Router,
    private readonly formBuilder : FormBuilder,
    private readonly _authHTTP:AuthService,
    private _storage: StorageService,
    private toastr:ToastrService) {
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
    user.email = userForm.email;
    user.password = userForm.password;
    this._authHTTP.LoginUser(user).subscribe({
      next:data => { 
            let token = data.token;
            if (token == "FAIL"){
              swal({
                title: "Datos incorrectos",
                text: "los datos ingresados son incorrectos",
                icon: "error",
                timer: 3000,
              });
            }
            else{
              this._storage.addTokenToStorage(token);
              this.toastr.info("cargando pagina...", "datos correctos");
              this._authHTTP.isRolAdmin().subscribe({
                next: data => { if(data){
                 this.router.navigate(['admin/home']);
                }else{
                   this.router.navigate(['home']);
                }
              }}
             )
            }  
          }
        ,
        error: ()=> swal({
          title: "Servidor",
          text: "No se ha podido conectar con el servidor\nPruebe mas tarde",
          icon: "error",
          timer: 3000,
        })
      })     
  }

  // -------------------atributos-------------------
 
  private openedForm: boolean;
  public form: FormGroup;
  


}


