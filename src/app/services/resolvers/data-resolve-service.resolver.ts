import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { User } from 'app/model/User';
import { Observable, of } from 'rxjs';
import { UserService } from '../http/User.service';

@Injectable({
  providedIn: 'root'
})
export class DataResolveServiceResolver implements Resolve<User> {
  constructor(private _userSvc: UserService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    //return this.serv.getHero(route.paramMap.get('id')
    return this._userSvc.getUser()
  }
}
