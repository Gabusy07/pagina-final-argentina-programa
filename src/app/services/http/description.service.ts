import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Description } from 'app/model/Description';
import { Observable } from 'rxjs';
import baseUrl from './helper';

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

  deleteDescription(id:number):Observable<object>{
    const headers = this.getheader();
    return this.request.delete(this.url+"/delete/"+id)
   }

  updateDescription(id:number, editedDesc:Description):Observable<object>{
    const headers = this.getheader();
    return this.request.post(this.url+"/update", editedDesc, {headers})
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
  private url = `${baseUrl}/porfolio/home/description`;
}
