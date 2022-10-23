import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { User } from 'app/model/User';
import { UserMatch } from 'app/model/UserMatch';
import { UserMatchService } from 'app/services/http/user-match-service';
import { UserService } from 'app/services/http/User.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  
  @Output() onCloseRegisterEvent = new EventEmitter<boolean>();

  constructor( private router: Router, private readonly formBuilder : FormBuilder ,
     private readonly httpSvc: UserService, private readonly httpUserMatchSvc: UserMatchService) {
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
    this.saveUser();
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

    this.httpSvc.createUser(u).subscribe({
      
      next: data => {
        alert ("usuario guardado con exito")
    },
      error: error => {
             console.log (error);
             //setTimeout(() => window.location.reload(), 550 );
      },
      complete: ()=>  this.logAfterRegister(u) //una vez hecho el registro logea al usuario para guardar el token
      //en local storage
    });


  }

  logAfterRegister(u:User){
    let user_match = new UserMatch();
    this.httpSvc.LoginUser(u).subscribe({
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
                         
        },
        //una vez loggeado el usuario recientemente creado llama a matchserver para crear la tabla de match
        complete: ()=>{
          this.httpUserMatchSvc.createMatch(user_match).subscribe({
            next: data => console.log("exito"),
            error: err => console.log("error")
          })

        }
       }
    )

  }


  //--------------------------------------------------------
  //atributos
  private user_created:boolean = false;
  private a:any;
  private openedForm: boolean;
  public form: FormGroup;

}