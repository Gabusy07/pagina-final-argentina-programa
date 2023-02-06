import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'app/model/Project';
import { ProjectsService } from 'app/services/http/projects.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projects-container',
  templateUrl: './projects-container.component.html',
  styleUrls: ['./projects-container.component.css']
})
export class ProjectsContainerComponent implements OnInit {

  constructor(private toastr:ToastrService, private route:ActivatedRoute, private readonly _ProjectsHTTP: ProjectsService) { }

  ngOnInit(): void {
    //REVISAR
    //let listProjects:Project[]= this.getAllProjects();
    this.projects = this.createObjForList(listProjects);
    alert(this.projects.length)
  }

  projectAlertMessage(projectEnable:Boolean){
    if(projectEnable){
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

  private getAllProjects(){
    let projects:Project[]= [];
    this._ProjectsHTTP.getAllProjects().subscribe({
      next: data=>{ 
        projects = data
        return projects
      }
    });
  }


  /*--------------atributes----------------------*/
  projects!:Project[][];

}