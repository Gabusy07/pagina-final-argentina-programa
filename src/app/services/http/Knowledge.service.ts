import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Knowledge } from 'app/model/Knowledge';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService {

  constructor(private request:HttpClient) { }

  createKnowledge(knw: Knowledge): Observable<Object>{
    return this.request.post<Knowledge>(this.url+"/add", knw);
  }

  deleteKnowledge(id:number):  Observable<Object>{
    return this.request.delete(this.url+"/delete/"+id)
  }

  updateKnowledge(id:number, knw:Knowledge): Observable<Object>{
    return this.request.patch(this.url+`/update/${id}`, knw);
  }

  getAll(): Observable<Knowledge[]>{
    return this.request.get<Knowledge[]>(this.url+"/all");
  }

  /*-----------------------------------------
  atributos
  */
  private url = `${baseUrl}/porfolio/languages`;

}
