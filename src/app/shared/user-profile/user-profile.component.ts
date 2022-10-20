import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/User';
import { UserService } from 'app/services/http/User.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor( private readonly httpSvc: UserService) { }

  ngOnInit(): void {
    this.chargingDataUser();
  }

  //funciones leer, editar, eliminar cuenta  User de DDBB


  /*----------------------------------------------
crud con servidor
*/

chargingDataUser():void{

  this.httpSvc.getUser().subscribe({
    next: data =>  this.user = data,
    error: error => console.log (error),
  });

}

  /*--------------------------------------------
atributos
*/

user:User = new User();

}
