import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/http/User.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor( private readonly httpSvc: UserService) { }

  ngOnInit(): void {
  }

  //funciones leer, editar, eliminar cuenta  User de DDBB



  public getUser(){
    

  }

}
