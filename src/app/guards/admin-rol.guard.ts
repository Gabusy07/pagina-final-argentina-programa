import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { StorageService } from 'app/services/storage.service';
import { Observable, of } from 'rxjs';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class AdminRolGuard implements CanActivate {
  constructor(private _storage: StorageService, private _route: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let roles:any = this._storage.getRolesFromStorage;
      let arrayRoles:string[] = JSON.parse( roles((data: any) => data))
      if (arrayRoles.includes("admin")){
        return true
      }
      swal({
        title: "Ruta denegada",
        text: "La dirección a la que quieres ingresar requiere que inicies sesión \n o puedes ingresar como invitado",
        icon: "error",
        timer: 7000,
      });
       return of(this._route.createUrlTree(['']))
      return false
     
  }
  
}
