import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/model/User';
import { Observable } from 'rxjs';

// servicio conecta con los formularios loginForm y RegisterForm
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private request:HttpClient) { }

  
  //metodos conexion con servidor crear, leer, loggear, eliminar, modificar
  createUser(u: User): Observable<object>{
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    
    return this.request.post<User>(this.url+"/add", u, {headers});
  }

  deleteUser(id:BigInt):Observable<object>{
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage['token']);
    return  this.request.delete(this.url+"/delete/"+id, {headers});
  }

  LoginUser(u: User):Observable<object>{
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return this.request.post<User>(this.url+"/data", u, {headers});
    
  }

  getUser(id: BigInt):Observable<object>{
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage['token']);
    return this.request.get<User>(this.url+"/data/"+id, {headers});
    
  }

  updateUser(id: BigInt, u:User):Observable<object>{
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage['token']);
    return this.request.patch<User>(this.url+"/update"+id, u, {headers});

  }

  // conecta con UserController en el servidor
  url = "http://localhost:8080/porfolio/user";

  // conecta con AuthController en el servidor
  urlLogIn = "http://localhost:8080/porfolio/api/login";

  
}
