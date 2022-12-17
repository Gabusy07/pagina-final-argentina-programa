import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from 'app/model/Skill';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private request:HttpClient) { }


  //-------------crud-----------------


  createSkill(skill: Skill): Observable<Object>{
    const headers = this.getheader();
    return this.request.post<Skill>(this.url+"/add", skill, {headers});

  }

  deleteSkill(id:number):  Observable<Object>{
    const headers = this.getheader();
    return this.request.delete(this.url+"/delete/"+id, {headers})
  }

  updateSkill(id:number, skill: Skill): Observable<Object>{
    const headers = this.getheader();
    return this.request.patch(this.url+`/update/${id}`, skill, {headers});
  }

  getAll(): Observable<Skill[]>{
    const headers = this.getheader();
    return this.request.get<Skill[]>(this.url+"/data", {headers});
  }

  private getheader():HttpHeaders{
  

    const token:string = localStorage['token'];
    
    const headers= new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: token
    })
    return headers;
  }


  //------------atributos------------

  private url = `${baseUrl}/porfolio/home/skills`;
}
