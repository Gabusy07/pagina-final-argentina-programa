import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/model/User';
import { UserService } from 'app/services/http/User.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();


  constructor(private route: Router, private readonly httpSvc: UserService,private toastr:ToastrService
     ) {
      this.isGuest = true;
      }

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

logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('roles')
}


/*----------------------------------------------
crud con servidor
*/

chargingDataUser():void{
  this.httpSvc.getUser().subscribe({
    next: data =>  {
      this.user = data;
      this.isGuest = false;
    },
    error: error => {
      this.isGuest = true;
      console.log (error)},
  });

}

onDeleteUser(){
  if (confirm("seguro que deseas eliminar esta cuenta?")){
       this.httpSvc.deleteUser().subscribe({
          next: () => {
            this.toastr.success("exito", "usuario eliminado")
            localStorage.removeItem('token')
            localStorage.removeItem('roles')
            this.route.navigate([''])
          }
          }
        )

  }

}


/*--------------------------------------------
atributos
*/

visibilityOfSidebar=false; //estado actual de visibilidad
activeVisibilityOfSidebar=true; // al hacer click en evento
sidebar:string = "sidebar--closed"
user:User = new User();
isGuest!: boolean;

}
