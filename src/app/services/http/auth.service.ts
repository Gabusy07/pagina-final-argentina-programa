import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from 'app/model/Token-interface';
import { User } from 'app/model/User';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly request:HttpClient) { }


  public LoginUser(u: User):Observable<Token>{
    return this.request.post<Token>(this.urlLogin+"login", u); //devuelve respuesta con el token
    
  }

  public isLogged():Observable<boolean>{
    const headers = this.getheader();
    return this.request.get<boolean>(this.urlLogin+"logged", {headers}); 
  }

  public isRolAdmin():Observable<boolean>{
    const headers = this.getheader();
    return this.request.get<boolean>(this.urlLogin+"auth/admin", {headers}); 
  }

  public isRolCommon():Observable<boolean>{
    const headers = this.getheader();
    return this.request.get<boolean>(this.urlLogin+"auth/common", {headers}); 
  }

  public isRolGuess():Observable<boolean>{
    const headers = this.getheader();
    return this.request.get<boolean>(this.urlLogin+"auth/guess", {headers}); 
  }

  public guestToken():Observable<Token>{
    return this.request.get<Token>(this.urlLogin+"auth/guest"); //devuelve respuesta con el token
  }

  private getheader():HttpHeaders{
  
    const token:string = localStorage['token'];
    const headers= new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: token
    })
    return headers;
  }

  // conecta con AuthController en el servidor
  private urlLogin = `${baseUrl}/porfolio/api/`;
}
