import { Injectable, OnInit } from '@angular/core';
import { Language } from 'app/model/LanguageEnum';
import { User } from 'app/model/User';
import { AuthService } from './http/auth.service';
import { UserService } from './http/User.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private _userHTTP: UserService, private readonly _authHTTP:AuthService)  {}
  

  addUserToStorage(){
    this._userHTTP.getUser().subscribe({
      next: data => {
        this.user = data
        localStorage.setItem("roles",JSON.stringify(this.user.roles))
      }
    })
  }

  addTokenToStorage( token : string ){
    localStorage.setItem("token", token)
  }

  getRolesFromStorage():any{
    return localStorage.getItem( "roles" );
  }

  clearLocalStorage():void{
    localStorage.removeItem( "roles" );
    localStorage.removeItem( "token" )
  }

  getCurrentLanguage():any{
    let a = localStorage.getItem("language")
    console.log(a)
    return a
  }
  addLanguageToStorage( lang : Language ){
    localStorage.setItem( "language", lang.toString() )
  }

user:User = new User()
}
