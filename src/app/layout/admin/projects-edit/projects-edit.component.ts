import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'app/model/Project';
import { ProjectsService } from 'app/services/http/projects.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert';

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
    this.openForm = false;
    this.editPen = false;
    this.deleteTrash = false;
    this.form = this.initForm();
    this.indexsDeleteProject = [NaN,NaN];
    this.indexsEditProject = [NaN,NaN];
   }

  ngOnInit(): void {
    let listProjects: Project[] = this.route.snapshot.data['data'];
    this.projects = this.createObjForList(listProjects);
  }

  /*------------------------------------------------------
  construccion del reactiveForm

  formulario y funciones de edicion
  */
  initForm(): FormGroup{
    return this.formBuilder.group({
      title: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      image: [''],
      description: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      linkProject: ['',[Validators.required]]
    })

  }

  get Title (){
    return this.form.get('title');

  }

  get Image (){
    return this.form.get('image');

  }

  get Description (){
    return this.form.get('description');

  }


  get LinkProject (){
    return this.form.get('linkProject');

  }


  onAddSquare():void{
    this.openForm =true;

  }

  onCloseForm():void{
    this.openForm = false;

  }

  submitForm(){
    this.openForm = false;
    const f = this.form.value;
    const project = new Project(NaN, f.title, f.linkProject, f.image, f.description)
    this.addProject(project)
  }

  onDeleteSquare():void{
    this.deleteTrash = this.deleteTrash == false ? true : false;
    this.editPen = false;

  }

  onEditPen(i:number, j:number):void{
    
    this.indexsEditProject = [i, j];
    this.editPen = !this.editPen
    this.deleteTrash = false;

  }


  onDeleteTrash(i:number, j:number):void{
    this.indexsDeleteProject = [i, j];
    this.deleteTrash = !this.deleteTrash;
    this.editPen = false;
  }

  onEditButtom(i:number, j:number):void{  //los argumentos son los indices de la lista de pares y del obj en esta ultima
    
    const oldProject = this.projects[i][j]
    const f = this.form.value;
    //asegura que se hayan realizado cambios en form y sino guarda los antiguos
    let title = f.title? f.title.charAt(0).toUpperCase() + f.title.slice(1): oldProject.title;
    let image = f.image? f.image: oldProject.image;
    let description = f.description? f.description: oldProject.description;
    let linkProject = f.linkProject? f.linkProject: oldProject.linkProject;
    const project = new Project(NaN, title, linkProject, image, description);
    this.updateProject(oldProject.id, project)
    window.location.reload();

  }

  onDeleteButtom(i:number, j:number):void{  //los argumentos son los indices de la lista de pares y del obj en esta ultima
    this.deleteProject(this.projects[i][j].id);
    window.location.reload();

  }

  //---------------------otras funcionalidades-------------------------------------------
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

  addProject(p:Project){
    this._ProjectsHTTP.createProject(p).subscribe({
      next: ()=> swal({
        title: "Carga exitosa",
        text: "",
        icon: "success",
        timer: 3000,
      }),
      error: error => {
        console.log(error);
        alert ("no se han podido guardar los datos")
      },
      complete: ()=> setTimeout(()=> window.location.reload(), 3000)

  });
    
    
  }

  deleteProject(id: number){
    this._ProjectsHTTP.deleteProject(id).subscribe({
      next: data => {
        swal({
          title: "Borrado exitoso",
          text: "",
          icon: "info",
          timer: 3000,
        })
      }
    ,
      error: error => console.log (error),
    });

  }

  updateProject(id:number, projectEdited:Project):void{
    this._ProjectsHTTP.updateProject(id, projectEdited).subscribe({
      next: ()=> swal({
        title: "Guardado",
        text: "Datos guardados con exito",
        icon: "success",
        timer: 3000,
      }),
      error: error => {
        console.log(error);
        alert ("no se han podido actualizar los datos")
      },
      complete: ()=> window.location.reload()
  });
}



  //--------------------------------------------
  openForm:boolean;
  editPen:boolean;
  deleteTrash:boolean;
  form:FormGroup;
  projects!:Project[][];
  indexsDeleteProject: number[];
  indexsEditProject: number[];

}
