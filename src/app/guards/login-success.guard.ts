import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from 'app/services/http/User.service';
import { Observable } from 'rxjs';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class LoginSuccessGuard implements CanActivate {

  constructor(private route: Router, private readonly userSvc: UserService) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.login) return true;
      swal({
        title: "Acceso negado",
        text: "debes estar registrado o \n ingresar como invitado para acceder a esa ruta",
        icon: "error",
        timer: 3000,
      });
      this.route.navigate(['/']);
      return false;
  }

  public isUserLogged(){
    
    let a = this.userSvc.isLogged().subscribe({
      next: resp => this.login = resp,
      error: error => {console.log(error)
      alert()}
    })

  }


  private login:boolean = false;
  
}
