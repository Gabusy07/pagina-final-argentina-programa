import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginSuccessGuard } from './guards/login-success.guard';
import { UserService } from './services/http/User.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( private router: Router,private readonly httpSvc: UserService, private loginGuard: LoginSuccessGuard) {
  }

  title = 'porfolio-arg-programa';

  enterPage(){
    //this.router.navigate(['']);
  }
  
}
