import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserMatch } from "app/model/UserMatch";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class UserMatchService {
    constructor(private request:HttpClient) { }

    //metodos conexion con servidor crear, leer, loggear, eliminar, modificar

    createMatch(u: UserMatch): Observable<object>{
        const headers = this.getheader();
        
        return this.request.post<UserMatch>(this.url+"/add", u, {headers});
      }
    
      deleteMatch():Observable<object>{
        const headers = this.getheader();
        return  this.request.delete(this.url+"/delete", {headers});
      }
    
    
    
      getMatch():Observable<UserMatch>{
        const headers = this.getheader();
        return this.request.get<UserMatch>(this.url+"/data", {headers});
        
      }

      getAllMatch():Observable<Array<UserMatch>>{
        const headers = this.getheader();
        return this.request.get<Array<UserMatch>>(this.url+"/data", {headers});
        
      }
    
      updateMatch( u:UserMatch):Observable<object>{
        const headers = this.getheader();
        return this.request.patch<UserMatch>(this.url+"/update", u, {headers});
    
      }


    private getheader():HttpHeaders{
  

        const token:string = localStorage['token'];
        
        const headers= new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: token
        })
        return headers;
      }


 // atributos
  url = "http://localhost:8080/porfolio/user_match";
  }