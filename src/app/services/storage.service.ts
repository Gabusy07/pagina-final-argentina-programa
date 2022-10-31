import { Injectable } from '@angular/core';
import { User } from 'app/model/User';

import { UserService } from './http/User.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private _userHTTP: UserService) { }

  addUserToStorage(){
    this._userHTTP.getUser().subscribe({
      next: data => {
        this.user = data
        localStorage.setItem("roles",JSON.stringify(this.user.roles))
      }
    })
  }

  addTokenToStorage(token :string){
    localStorage.setItem("token", token)

  }

  getRolesFromStorage():any{
    return localStorage.getItem("roles");
  }

user:User = new User()
}
