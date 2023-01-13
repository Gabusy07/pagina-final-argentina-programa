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

  createProject(project:Project):Observable<object>{
    const headers = this.getheader();
    return this.request.post(this.url+"/add", project, {headers});
   }

  readOneProject(id:number):Observable<Project>{
    const headers = this.getheader();
    return this.request.get<Project>(this.url+`/data/{id}`, {headers});
   }

   getAllProjects():Observable<Project[]>{
    const headers = this.getheader();
    return this.request.get<Project[]>(this.url+"/all-data",{headers})
   }

  deleteProject(id:number):Observable<object>{
    const headers = this.getheader();
    return this.request.delete(this.url+"/delete/"+id)
   }

  updateProject(id:number, project:Project):Observable<object>{
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
  private url = `${baseUrl}/porfolio/project`;
}
