import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Language } from 'app/model/Language';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private request:HttpClient) { 

  }

  createLanguage(lang: Language): Observable<Object>{
    return this.request.post<Language>(this.url+"/add", lang);

  }

  deleteLanguage(id:BigInt):  Observable<Object>{
    return this.request.delete(this.url+"/delete/"+id)
  }

  updateLanguage(lang:Language, id:BigInt): Observable<Object>{
    return this.request.patch(this.url+"/delete/"+id, lang);
  }

  getAll(): Observable<Language[]>{
    return this.request.get<Language[]>(this.url+"/all");
  }


  
   // conecta con LanguageController en el servidor
   url = "http://localhost:8080/porfolio/languages";
}
