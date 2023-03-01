import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'app/model/Project';
import { ProjectsService } from 'app/services/http/projects.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert';

@Component({
  selector: 'app-projects-container',
  templateUrl: './projects-container.component.html',
  styleUrls: ['./projects-container.component.css']
})
export class ProjectsContainerComponent implements OnInit {

  constructor(private toastr:ToastrService,
     private route:ActivatedRoute,
     private readonly _ProjectsHTTP: ProjectsService) { }

  ngOnInit(): void {
    this.getAllProjects();
  }

  projectAlertMessage(projectEnable:Boolean){
    if(!projectEnable){
      this.toastr.info("projecto en construcción", "No disponible");
    }
  }

  private createObjForList(list:Project[]):Project[][]{
    let resultList:Project[][]=[]
    for(let i=0; i<= list.length; i+=2){
      if (i+1 > list.length){
        break
      }
      if (i == list.length-1){
        resultList.push([list[i]])
        break
      }
      resultList.push([list[i], list[i+1]])
    }
    return resultList;
  }

 private getAllProjects():void{
  let list:Project[];
  this._ProjectsHTTP.getAllProjects().subscribe({
    next: data =>  list = data,
    error: error => swal({
      title: "Servidor",
      text: "No se ha podido conectar con el servidor",
      icon: "info",
      timer: 3000,
    }),
    /* asegura que la peticion al servidor se haya completado y llama a
    la funcion que carga en una nueva lista para mejor lectura en html */
    complete: ()=> this.projects = this.createObjForList(list)
  });
}



  /*--------------atributes----------------------*/
  projects!:Project[][];

}