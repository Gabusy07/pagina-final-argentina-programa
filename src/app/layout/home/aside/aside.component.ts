import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/model/User';
import { UserMatchService } from 'app/services/http/user-match-service';
import { UserService } from 'app/services/http/User.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();


  constructor(private route: Router, private readonly httpSvc: UserService,
     private readonly httpUserMatchSvc: UserMatchService) { }

  ngOnInit(): void {
    this.chargingDataUser()

  
  }

showAsidebar(){

  this.closingSidebar();
  this.activeVisibilityOfSidebar = this.activeVisibilityOfSidebar? false : true;
  this.messageEvent.emit(this.activeVisibilityOfSidebar? "active":"inactive"); //envia estado de activacion a componente padre
  setTimeout(()=>{
    this.visibilityOfSidebar = this.activeVisibilityOfSidebar? false : true;
    

  },500)
}

closingSidebar(){
  this.sidebar = this.activeVisibilityOfSidebar? "sidebar--closed":"sidebar--opened"
}

visibilityOfSidebar=false; //estado actual de visibilidad
activeVisibilityOfSidebar=true; // al hacer click en evento
sidebar:string = "sidebar--closed"



/*----------------------------------------------
crud con servidor
*/

chargingDataUser():void{

  this.httpSvc.getUser().subscribe({
    next: data =>  this.user = data,
    error: error => console.log (error),
  });

}

onDeleteUser(){
  if (confirm("seguro que deseas eliminar esta cuenta?")){
    this.httpUserMatchSvc.deleteMatch().subscribe({
      next: ()=> console.log("usuario eliminado con exito"),
      complete: ()=>{
        localStorage.removeItem('token')
        this.httpSvc.deleteUser().subscribe({
          next: data =>  console.log("exito"),
          complete: ()=> this.route.navigate([''])
        })
  
      }
    })

  }

}



/*--------------------------------------------
atributos
*/

user:User = new User();


}
