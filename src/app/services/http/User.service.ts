import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/model/User';
import { Observable } from 'rxjs';
import { Token } from 'app/model/Token-interface';

// servicio conecta con los formularios loginForm y RegisterForm
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private request:HttpClient) { }

  
  //metodos conexion con servidor crear, leer, loggear, eliminar, modificar
  createUser(u: User): Observable<object>{
    const headers = this.getheader();
    
    return this.request.post<User>(this.url+"/ad", u, {headers});
  }

  deleteUser():Observable<object>{
    const headers = this.getheader();
    return  this.request.delete(this.url+"/delete", {headers});
  }

  LoginUser(u: User):Observable<Token>{
    return this.request.post<Token>(this.urlLogIn+"login", u); //devuelve respuesta con el token
    
  }


  getUser():Observable<User>{
    const headers = this.getheader();
    return this.request.get<User>(this.url+"/data", {headers});
    
  }

  updateUser( u:User):Observable<object>{
    const headers = this.getheader();
    return this.request.patch<User>(this.url+"/update", u, {headers});

  }

  private getheader():HttpHeaders{
  

    const token:string = localStorage['token'];
    
    const headers= new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: token
    })
    return headers;
  }




  // conecta con UserController en el servidor
  url = "http://localhost:8080/porfolio/user";

  // conecta con AuthController en el servidor
  urlLogIn = "http://localhost:8080/porfolio/api/";

  
}
