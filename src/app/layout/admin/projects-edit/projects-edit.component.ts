import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'app/model/Project';
import { ProjectsService } from 'app/services/http/projects.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.css']
})
export class ProjectsEditComponent implements OnInit {

  constructor(
     private readonly formBuilder : FormBuilder,
     private route:ActivatedRoute,
     private toastr:ToastrService,
     private readonly _ProjectsHTTP: ProjectsService
    ) {
    this.form = this.initForm();
   }

  ngOnInit(): void {
    let listProjects: Project[] = this.route.snapshot.data['data'];
    this.projects = this.createObjForList(listProjects);
  }

  //construccion del reactiveForm
  initForm(): FormGroup{
    return this.formBuilder.group({
      title: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      image: [''],
    })

  }

  get Title (){
    return this.form.get('title');

  }

  get Image (){
    return this.form.get('image');

  }

  onAddSquare():void{
    this.openForm =true;

  }

  onCloseForm():void{
    this.openForm = false;

  }

  submitForm(){
    this.openForm = false;
    alert("datos guardados");

  }

  onDeleteSquare():void{
    this.deleteTrash = this.deleteTrash == false ? true : false;
    this.editPen = false;

  }

  //--------------------------------
  projectAlertMessage(){
    this.toastr.info("projecto en construcción", "No disponible");

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


  //---------------CRUD-----------------------


  openForm:boolean = false;
  editPen:boolean = false;
  deleteTrash:boolean = false;
  form:FormGroup;
  projects!:Project[][];

}
