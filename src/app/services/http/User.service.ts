import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/model/User';
import { Observable } from 'rxjs';

// servicio conecta con los formularios loginForm y RegisterForm
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private request:HttpClient) { }

  
  //crea un usuario
  createUser(u: User): Observable<object>{
    
    return this.request.post<User>(this.url+"/api/add", u);
  }

  deleteUser():void{}

  getUser():void{
    //debe retornar user
  }

  updateUser():void{}

  // conecta con UserController en el servidor
  url = "http://localhost:8080/porfolio/user";

  
}
