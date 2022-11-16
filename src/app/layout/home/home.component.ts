import { AfterViewInit, Component, DoCheck, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/http/auth.service';
import { StorageService } from 'app/services/storage.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {


  constructor(
    private router: Router,
    private readonly _authHTTP:AuthService,
    ) {
  }
  

  ngOnInit(): void { 
    
  }


  
  changeColumnSide(){
    this.pos_about = this.childMessage == "active"? "about_pos--before" : "about_pos--after";
  }
  
  receiveMessage($event:string) {  //recibe de asideComponent un mensaje de activo o inactivo del aside
    this.childMessage = $event
    this.changeColumnSide();
  }

  @HostListener("document:scroll")
  enable_mainComponents():void{
    if(document.body.scrollTop > 1 || document.documentElement.scrollTop > 0){
      this.enableComponent = true;
      this.enableArrow = false;
      this.enableAside = true;

    } 
    
    if(document.body.scrollTop > 1 || document.documentElement.scrollTop > 0)  this.enableProjectComponent = true;

    if(document.body.scrollTop > 2 || document.documentElement.scrollTop > 0)  this.enableFooterComponent = true;
    else{
       this.enableComponent = false;
       this.enableProjectComponent = false;
       this.enableFooterComponent = false;
       this.enableArrow = true;
       this.enableAside = false;
    }
  }

  enableAside: boolean = false;
  enableArrow: boolean = true;
  enableFooterComponent: boolean = false;
  enableProjectComponent:boolean = false
  enableComponent:boolean = false;
  childMessage:string="";
  col_aside:string= "col-0";
  pos_about:string= "about_pos--before";
  isUserLogged:boolean = true;

}
