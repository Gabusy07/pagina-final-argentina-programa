import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'app/services/http/auth.service';

import { catchError, map, Observable, of } from 'rxjs';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class LoginSuccessGuard implements CanActivate {

  constructor(private _route: Router, private readonly _authHTTP: AuthService,) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree { 
      
        return  this._authHTTP.isLogged()
        .pipe(
            // Si la petición es exitosa se puede proceder
            map(() => true),
            // Si la peticion tiene un error de estado >= 400 se dirige al login
            catchError(() => {
              swal({
                title: "Ruta denegada",
                text: "La dirección a la que quieres ingresar requiere que inicies sesión \n o puedes ingresar como invitado",
                icon: "error",
                timer: 7000,
              });
              return of(this._route.createUrlTree(['']))
            })
        );
      }
  }
      
