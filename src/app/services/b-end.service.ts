import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BEndService {

  constructor(private request:HttpClient) { }

  url = "http://localhost:8080/porfolio/user";  //direccion del backend (verificar)

  addUser(){
    //this.request.post(this.url, u);
  }

  
}
