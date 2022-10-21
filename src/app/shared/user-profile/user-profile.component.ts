import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/User';
import { UserMatch } from 'app/model/UserMatch';
import { UserMatchService } from 'app/services/http/user-match-service';
import { UserService } from 'app/services/http/User.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor( private readonly httpSvc: UserService, private readonly httpUserMatchSvc: UserMatchService) { }

  ngOnInit(): void {
    this.chargingDataUser();
  }

  //funciones leer, editar, eliminar cuenta  User de DDBB


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
  this.httpSvc.deleteUser().subscribe({
    next: data =>  console.log("exito"),
    error: error => console.log (error),
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

  /*--------------------------------------------
atributos
*/

name!: String;
lastname!: String;
nickname!: String;
email!: String;
password!: String;

user_match:UserMatch = new UserMatch();
user:User = new User();

}
