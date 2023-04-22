import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'app/model/Project';
import { FilesService } from 'app/services/files.service';
import { ProjectsService } from 'app/services/http/projects.service';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable } from 'rxjs';
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
     private readonly _ProjectsHTTP: ProjectsService,
     private imgSvc: FilesService
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
      title: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      image: [''],
      description: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      linkProject: [''],
      enabled: [''],
      disabled: ['']
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

  get Enabled (){
    return this.form.get('enabled');

  }

  get Disabled (){
    return this.form.get('disabled');

  }


  onAddSquare():void{
    this.openForm =true;

  }

  onCloseForm():void{
    this.openForm = false;

  }

  submitForm(){
    this.openForm = false;
    const project = this.formatedProjectData(new Project());
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
    //asegura que se hayan realizado cambios en form y sino guarda los antiguos
    const project = this.formatedProjectData(oldProject);
    this.updateProject(oldProject.id, project)

  }

  onDeleteButtom(i:number, j:number):void{  //los argumentos son los indices de la lista de pares y del obj en esta ultima
    this.deleteProject(this.projects[i][j].id);
    window.location.reload();

  }


  

  //---------------------otras funcionalidades-------------------------------------------
  projectAlertMessage(projectEnable:Boolean){
    this.isHovering = false;
    if(projectEnable){
      this.toastr.info("projecto en construcción", "No disponible");
    }
  }

  onMouseOutImg() {
    this.isHovering = true;
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

 private addProject(p:Project){
    this._ProjectsHTTP.createProject(p).subscribe({
      next: ()=> swal({
        title: "Carga exitosa",
        text: "",
        icon: "success",
        timer: 3000,
      }),
      error: error => {
        swal({
          title: "error",
          text: "no se han podido guardar los datos",
          icon: "error",
          timer: 3000,
        })
      },
      complete: ()=> setTimeout(()=> window.location.reload(), 3000)

  });
    
    
  }

  private deleteProject(id: number){
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

  private updateProject(id:number, projectEdited:Project):void{
    this._ProjectsHTTP.updateProject(id, projectEdited).subscribe({
      next: ()=> swal({
        title: "Guardado",
        text: "Datos guardados con exito",
        icon: "success",
        timer: 3000,
      }),
      error: () => {
        swal({
          title: "Error",
          text: "no se han podido actualizar los datos",
          icon: "error",
          timer: 3000,
        })},
      complete: ()=> setTimeout(()=> window.location.reload(), 3000)
  });
}


//--------------------download and upload image to firebase------------------------

uploadImg($e:any){
  const file = $e.target.files[0];
  const firebase_folderName:String = "project_images/";
  if(this.imgSvc.isFileValid(file)){
    if (confirm("deseas subir este archivo?")){
      this.isUploadingIncomplete = true;
      const fileRef = this.imgSvc.getRef(file.name, firebase_folderName);
      const task:any = this.imgSvc.uploadFile(file, firebase_folderName)
      this.namePhoto = file.name;
      this.uploadPercent = task.percentageChanges();
      this.uploadPercent.subscribe(
        ({complete: ()=> this.isUploadingIncomplete = false})
      )
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(imgRef => {
            this.imageUrl = imgRef
          })
        } )
     ).subscribe({
      error: () =>{
        swal({
          title: "Error",
          text: "no se han podido cargar el archivo",
          icon: "error",
          timer: 3000,
        })
     }})
    }
  }
}

openUPloadImgForm(){
  this.editPhoto = !this.editPhoto;
}

onSubmitPhoto():void{
  this.editPhoto = !this.editPhoto;
}

private formatedProjectData(p : Project): Project{

  const f = this.form.value;
  let title = f.title? f.title.charAt(0).toUpperCase() + f.title.slice(1): p.title;
  let image = this.imageUrl =="" || this.imageUrl == null && f.image ===""? p.image : this.imageUrl ;
  let description = f.description? f.description: p.description;
  let linkProject = f.linkProject? f.linkProject: p.linkProject;
  let enabled = f.enabled == "YES"? false: true;

  const project = new Project();
  project.id = f.id;
  project.title = title;
  project.description = description;
  project.image = image;
  project.enabled = enabled;
  project.linkProject = linkProject;
  return project;
}


  //--------------------------------------------
  openForm:boolean;
  editPen:boolean;
  deleteTrash:boolean;
  form:FormGroup;
  projects!:Project[][];
  indexsDeleteProject: number[];
  indexsEditProject: number[];
  file!:any;
  namePhoto:String = "";
  imageUrl:String = "";
  isUploadingIncomplete!:boolean;
  uploadPercent!: Observable<any>;
  downloadURL!: Observable<string>;
  editPhoto: boolean = true;
  onEditText: boolean = true; 
  flexRadioDefault1!:any;
  isHovering = true;

}
