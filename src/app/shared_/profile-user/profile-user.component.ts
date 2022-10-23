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
      nickname: [this.user.nickname,[Validators.required, Validators.pattern("^[A-Za-z]\\w*$"), Validators.minLength(5), Validators.maxLength(12)]],
      name: [this.user.name,[Validators.required ,Validators.pattern('^[a-zA-ZÀ-ÿ \u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ \u00f1\u00d1]*)*[a-zA-ZÀ-ÿ \u00f1\u00d1]+$'), Validators.minLength(2), Validators.maxLength(50)]],
      lastname: [this.user.lastname,[Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ \u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ \u00f1\u00d1]*)*[a-zA-ZÀ-ÿ \u00f1\u00d1]+$') , Validators.minLength(1), Validators.maxLength(50)]],
      email: [this.user.email,[Validators.required, Validators.email]],
      password: [undefined,[Validators.required, Validators.minLength(5), Validators.maxLength(18)]],
      repeatPassword:[undefined]
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

  public get RepeatPassword(){
    return this.form.get('repeatPassword');
  }
  

  closingForm(){
    this.isEditFormOpen = !this.isEditFormOpen;

  }

  public editUser():void{
    this.form = this.initForm();
    this.isEditFormOpen = !this.isEditFormOpen;
  
  }


  isPasswordEqualsRepeatPassword():boolean{
    return this.form.get('password')?.value == this.form.get('repeatPassword')?.value;
  }

  submitSignIn(){
    let editedUser = new User();
    let f = this.form.value;
    if (f.password == f.repeatPassword){
      editedUser.name = f.name[0].toUpperCase()+f.name.substring(1) ;
      editedUser.lastname = f.lastname[0].toUpperCase()+f.lastname.substring(1)  ;
      editedUser.nickname = f.nickname;
      editedUser.email = f.email;
      editedUser.password = f.password == null?  this.user.password: f.password ;
    }
    this.updateUser(editedUser);
    this.isEditFormOpen = !this.isEditFormOpen;
    window.location.reload();
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

public updateUser(editedUser:User):void{
  const u = new User();
  u.name = editedUser.name;
  u.lastname = editedUser.lastname;
  u.nickname = editedUser.nickname;
  u.email = editedUser.email;
  u.password! = editedUser.password;
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




  /*--------------------------------------------
atributos
*/


isEditFormOpen: boolean = false;
form!: FormGroup;
user_match:UserMatch = new UserMatch();
user:User = new User();

}

