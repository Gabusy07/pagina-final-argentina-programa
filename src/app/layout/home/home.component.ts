import { Component, OnInit } from '@angular/core';

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
    this.col_about = this.childMessage == "active"? "col-9" : "col-12";
    this.col_aside = this.childMessage == "active"? "col-2": "col-0";

  }
  
  receiveMessage($event:string) {  //recibe de asideComponent un mensaje de activo o inactivo del aside
    this.childMessage = $event
    this.changeColumnSide();
  }

  childMessage:string="";
  col_aside:string= "col-0";
  col_about:string= "col-12";


}
