import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { isAdmin } from '@firebase/util';
import { AuthService } from 'app/services/http/auth.service';
import { StorageService } from 'app/services/storage.service';
import { catchError, filter, map, Observable, of } from 'rxjs';
import swal from 'sweetalert';
import { LoginSuccessGuard } from './login-success.guard';

@Injectable({
  providedIn: 'root'
})
export class AdminRolGuard implements CanActivate {
  constructor(private _storage: StorageService, private _route: Router, private readonly _authHTTP:AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      let roles:any = this._storage.getRolesFromStorage;
      let arrayRoles:string[] = JSON.parse( roles((data: any) => data))
      if (arrayRoles.includes("admin")){
        of(this._route.createUrlTree(['/admin/home']))
        return true;
      }
      swal({
        title: "Ruta denegada",
        text: "La dirección a la que quieres ingresar requiere que inicies sesión \n o puedes ingresar como invitado",
        icon: "error",
        timer: 7000,
      });
       return of(this._route.createUrlTree(['/home']))

    }
  }

