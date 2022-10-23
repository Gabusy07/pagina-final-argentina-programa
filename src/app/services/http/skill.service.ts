import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from 'app/model/Skill';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private request:HttpClient) { }


  //-------------crud-----------------


  createLanguage(skill: Skill): Observable<Object>{
    const headers = this.getheader();
    return this.request.post<Skill>(this.url+"/add", skill, {headers});

  }

  deleteLanguage(id:BigInt):  Observable<Object>{
    const headers = this.getheader();
    return this.request.delete(this.url+"/delete/"+id, {headers})
  }

  updateLanguage(id:BigInt, skill: Skill): Observable<Object>{
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

  url = "http://localhost:8080/porfolio/home/skills";
}
