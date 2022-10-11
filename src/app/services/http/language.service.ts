import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private request:HttpClient) { }


  
   // conecta con LanguageController en el servidor
   url = "http://localhost:8080/porfolio/languages";
}
