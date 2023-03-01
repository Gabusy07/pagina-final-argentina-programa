import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkExperience } from 'app/model/WorkExperience';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private request:HttpClient) {}
    //------------CRUD-------------

  createExperience(exp:WorkExperience):Observable<object>{
    const headers = this.getheader();
    return this.request.post(this.url+"/add", exp, {headers});
   }

  readExperience():Observable<WorkExperience[]>{
    const headers = this.getheader();
    return this.request.get<WorkExperience[]>(this.url+"/read", {headers});
   }

  deleteExperience(id:number):Observable<object>{
    const headers = this.getheader();
    return this.request.delete(this.url+"/delete/"+id)
   }

  updateExperience(id:number, exp:WorkExperience):Observable<object>{
    const headers = this.getheader()
    return this.request.patch(this.url+"/update/"+id, exp, {headers})
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
  private url = `${baseUrl}/porfolio/home/workExperience`;
   }
