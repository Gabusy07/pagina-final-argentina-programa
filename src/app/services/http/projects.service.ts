import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from 'app/model/Project';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private request:HttpClient) { }

  //------------CRUD-------------

  createExperience(project:Project):Observable<object>{
    const headers = this.getheader();
    return this.request.post(this.url+"/add", project, {headers});
   }

  readExperience():Observable<Project[]>{
    const headers = this.getheader();
    return this.request.get<Project[]>(this.url+"/read", {headers});
   }

  deleteExperience(id:number):Observable<object>{
    const headers = this.getheader();
    return this.request.delete(this.url+"/delete/"+id)
   }

  updateExperience(id:number, project:Project):Observable<object>{
    const headers = this.getheader()
    return this.request.patch(this.url+"/update/"+id, project, {headers})
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
