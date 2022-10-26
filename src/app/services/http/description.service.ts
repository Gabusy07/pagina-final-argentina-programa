import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Description } from 'app/model/Description';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DescriptionService {

  constructor(private request:HttpClient) {}


  //------------CRUD-------------
  createDescription(desc:Description):Observable<object>{
    const headers = this.getheader();
    return this.request.post(this.url+"/add", desc, {headers});
   }

  readDescription():Observable<Description[]>{
    const headers = this.getheader();
    return this.request.get<Description[]>(this.url+"/read", {headers});
   }

  deleteDescription(id:BigInt):Observable<object>{
    const headers = this.getheader();
    return this.request.delete(this.url+"/delete/"+id)
   }

  updateDescription(id:BigInt, editedDesc:Description):Observable<object>{
    const headers = this.getheader();
    return this.request.patch(this.url+"/update/"+id, editedDesc, {headers})
   }


  private getheader():HttpHeaders{
  
    const token:string = localStorage['token'];
    const headers= new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: token
    })
    return headers;
  }

  // ----------atributos---------
  url = "http://localhost:8080/porfolio/home/description";
}
