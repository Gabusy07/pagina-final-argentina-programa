import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  
  }

showAsidebar(){

  this.closingSidebar();
  this.activeVisibilityOfSidebar = this.activeVisibilityOfSidebar? false : true;
  this.messageEvent.emit(this.activeVisibilityOfSidebar? "active":"inactive");
  setTimeout(()=>{
    this.visibilityOfSidebar = this.activeVisibilityOfSidebar? false : true;
    

  },1000)
}

closingSidebar(){
  this.sidebar = this.activeVisibilityOfSidebar? "sidebar--closed":"sidebar--opened"
}

visibilityOfSidebar=true;
activeVisibilityOfSidebar=false;
sidebar:string = "sidebar--closed"

//revisar todo esto


}
