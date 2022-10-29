import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from 'app/services/http/User.service';
import { catchError, map, Observable, of } from 'rxjs';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class LoginSuccessGuard implements CanActivate {

  constructor(private route: Router, private readonly userSvc: UserService) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree { 
      
      
      return  this.userSvc.isLogged()
      .pipe(
          // Si la petición es exitosa se puede proceder
          map(() => true),
          // Si la peticion tiene un error de estado >= 400 se dirige al login
          catchError(() => {
            swal({
              title: "Datos incorrectos",
              text: "los datos ingresados son incorrectos",
              icon: "error",
              timer: 3000,
            });
             return of(this._router.createUrlTree(['/login']))
          })
      );
    }
  }
      
