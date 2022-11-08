import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Description } from 'app/model/Description';
import { DescriptionService } from 'app/services/http/description.service';
import { FilesService} from 'app/services/files.service';
import { LoadingService } from 'app/services/loading.service';
import { finalize, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-profile-info-edit',
  templateUrl: './profile-info-edit.component.html',
  styleUrls: ['./profile-info-edit.component.css']
})
export class ProfileInfoEditComponent implements OnInit {

  constructor(private readonly formBuilder : FormBuilder, private readonly descHttpSvc:DescriptionService,
    private imgSvc: FilesService, private loading:LoadingService, private toastr:ToastrService) {
    this.form = this.initForm();

}


  ngOnInit(): void {
    this.getDescription();
}


   //---------------CRUD READ UPDATE-------------------

  private getDescription():void{
    this.descHttpSvc.readDescription().subscribe({
      next: data =>  {
        this.id= BigInt(1);
        this.text= data[0].text;
        this.title = data[0].title;
        this.imageUrl = data[0].photo;
      },
      error: error => console.log(error),

    })
  }


  private updateDescription(id:BigInt, desc:Description):void{
    this.descHttpSvc.updateDescription(id, desc).subscribe({
      error: error => console.log(error)
    })
  }


  //-------------------------------------------------

  //construccion del reactiveForm
  initForm(): FormGroup{
    return this.formBuilder.group({
      text: [this.text,[Validators.required, Validators.minLength(12), Validators.maxLength(100)]],
      title: [this.title,[Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
    })

  }

  get Text(){
    return this.form.get('text');
  }

  get Title(){
    return this.form.get('title');
  }

  //para editar el texto descriptivo principal 
  textEditPen(){
      this.onEditText = !this.onEditText;
  }

  onSubmitText(){

  }

  /*  -----------------------------
  para cambiar la foto de perfil*/

  onPhotoEditPen():void{
    this.editPhoto = !this.editPhoto;
  }

  uploadImg($e:any){
    const file = $e.target.files[0];
   
    if(this.isFileValid(file)){
      
      if (confirm("deseas subir este archivo?")){
        const fileRef = this.imgSvc.getRef(file.name)
        const task = this.imgSvc.uploadFile(file);
        this.namePhoto = file.name;
        this.uploadPercent = task.percentageChanges();
        this.uploadPercent.subscribe(
          ({complete: ()=> this.isUploadingIncomplete = false})
        )
        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(imgRef => this.imageUrl = imgRef)
          } )
       )
      .subscribe()
  
      }

    }
  }

  onEditButtom():void{
    this.editPhoto = !this.editPhoto;
    const formText = this.form.value;
    this.title = formText.title;
    this.text = formText.text;
    this.onEditText = true;
    let desc:Description = new Description(this.text, this.title, this.imageUrl, this.namePhoto);
    this.updateDescription(this.id, desc);
  
  }


  onSubmitPhoto():void{
    this.editPhoto = !this.editPhoto;
    this.Title == undefined? "Sin titulo": this.title;
    let desc:Description = new Description(this.text, this.title, this.imageUrl,this.namePhoto);
    this.updateDescription(this.id, desc)
  }

  onDeletePhoto():void{
    this.editPhoto = !this.editPhoto;
    const task = this.imgSvc.deleteFile(this.namePhoto)
    task.suscribe()
    this.imageUrl = "#";
    this.namePhoto = "";
    let desc:Description = new Description(this.text, this.title, this.imageUrl, this.namePhoto);
    this.updateDescription(this.id, desc);
    this.loading.show()
    setTimeout(()=> this.loading.hide(), 2000)

  }



  private isFileValid(file:any):boolean{
    //verifica que el archivo seleccionado sea img
    //EXTENSIONES Y TAMANO PERMITIDO.
      var ext_availables = [".png", ".bmp", ".jpg", ".jpeg", ".svg"];
      var route = file.name;
      var last_dot = file.name.lastIndexOf(".");
      var extension = route.slice(last_dot, route.length);
      if(ext_availables.indexOf(extension) == -1)
      {
          this.toastr.warning("las imagenes solo pueden ser png, bmb, jpg , jpeg o svg","archivo no válido");
          file.name = "";
          return false;
      }
      return true;
  }

//--------------atributos------------

id!:BigInt;
text!: String;
editPhoto: boolean = true;
onEditText: boolean = true;
form: FormGroup;
title!:String;
file!:any;
namePhoto:String = "a"
imageUrl!:String;
isUploadingIncomplete:boolean = true;
uploadPercent!: Observable<any>;
downloadURL!: Observable<string>;

}




