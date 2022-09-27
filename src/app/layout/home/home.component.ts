import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {


  constructor() {


   }


  ngOnInit(): void {
  }

  changeColumnSide(){
    this.pos_about = this.childMessage == "active"? "about_pos--before" : "about_pos--after";
    //this.col_aside = this.childMessage == "active"? "aside_pos--before": "aside_pos--before";

  }
  
  receiveMessage($event:string) {  //recibe de asideComponent un mensaje de activo o inactivo del aside
    this.childMessage = $event
    this.changeColumnSide();
  }

  //revisar *********************
  @HostListener("document:scroll")
  enable_mainComponents():void{
    if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) this.enableComponent = true;
    
    if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0)  this.enableProjectComponent = true;
    else{
       this.enableComponent = false;
       this.enableProjectComponent = false;
    }
  }

  enableProjectComponent:boolean = false
  enableComponent:boolean = false;
  childMessage:string="";
  col_aside:string= "col-0";
  pos_about:string= "about_pos--before";


}
