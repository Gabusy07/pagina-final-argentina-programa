import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'app/model/User';
import { UserMatch } from 'app/model/UserMatch';
import { UserMatchService } from 'app/services/http/user-match-service';
import { UserService } from 'app/services/http/User.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  constructor(private readonly httpSvc: UserService, private readonly httpUserMatchSvc: UserMatchService,
    private router:Router,private readonly formBuilder:FormBuilder) { 
      this.form = this.initForm();
    }

  ngOnInit(): void {
    this.chargingDataUser();
  }

  /*--------------------------------
  form
  */
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


  closingForm(){

  }

  submitSignIn(){

  }

  /*----------------------------------------------
crud con servidor
*/

public chargingDataUser():void{

  this.httpSvc.getUser().subscribe({
    next: data =>  this.user = data,
    error: error => console.log (error),
    complete: ()=> this.chargingDataUserMatch()
  });

}

public deleteUser():void{
  confirm("seguro que deseas eliminar esta cuenta?")
  this.httpUserMatchSvc.deleteMatch().subscribe({
    error: error => console.log (error),
    complete: ()=>{

      this.httpSvc.deleteUser().subscribe({
        next: data =>  console.log("exito"),
      })

    }
  })

}

public updateUser():void{
  const u = new User();
  u.name = this.name;
  u.lastname = this.lastname;
  u.nickname = this.nickname;
  u.email = this.email;
  u.password! = this.password;
  this.httpSvc.updateUser(u).subscribe({
    next: ()=>  console.log("exito"),
    error: error => console.log (error),
  })

}


private chargingDataUserMatch():void{

  this.httpUserMatchSvc.getMatch().subscribe({
    next: data =>  this.user_match = data,
    error: error => console.log (error),
  });

}

//-------------------------------

public editUser():void{
  this.router.navigate(['register-form']);

}



  /*--------------------------------------------
atributos
*/

name: String = "NN";
lastname!: String;
nickname!: String;
email!: String;
password!: String;
form: FormGroup;
user_match:UserMatch = new UserMatch();
user:User = new User();

}

