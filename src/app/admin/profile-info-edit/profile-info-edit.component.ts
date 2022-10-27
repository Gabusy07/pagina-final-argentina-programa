import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Description } from 'app/model/Description';
import { DescriptionService } from 'app/services/http/description.service';
import { FilesService} from 'app/services/files.service';
import { getDownloadURL } from 'firebase/storage';
import { LoadingService } from 'app/services/loading.service';
import { finalize, Observable } from 'rxjs';




@Component({
  selector: 'app-profile-info-edit',
  templateUrl: './profile-info-edit.component.html',
  styleUrls: ['./profile-info-edit.component.css']
})
export class ProfileInfoEditComponent implements OnInit {

  constructor(private readonly formBuilder : FormBuilder, private readonly descHttpSvc:DescriptionService,
    private imgSvc: FilesService, private loading:LoadingService) {
    this.form = this.initForm();

}


  ngOnInit(): void {
    this.getDescription();
    
}


   //---------------CRUD READ UPDATE-------------------

  private getDescription():void{
    this.descHttpSvc.readDescription().subscribe({
      next: data =>  {
        this.id= data[0].id;
        this.text= data[0].text;
        this.title = data[0].title;
        this.imageUrl = data[0].photo;
      },
      error: error => console.log(error),

    })
  }


  private updateDescription(id:BigInt, desc:Description):void{
    this.descHttpSvc.updateDescription(id, desc).subscribe({
      next: data=> console.log("data"),
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
    this.file = $e.target.files[0];
    if (confirm("deseas subir este archivo?")){
      const fileRef = this.imgSvc.getRef($e)
      const task = this.imgSvc.uploadFile(this.file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()

    }
  }

  onEditButtom():void{
    this.editPhoto = !this.editPhoto;
    const formText = this.form.value;
    this.title = formText.title;
    this.text = formText.text;
    this.onEditText = true;
    let desc:Description = new Description(this.text, this.title, this.imageUrl);
    this.updateDescription(this.id, desc);
  
  }

  //revisar luego

  onSubmitPhoto():void{
    this.editPhoto = !this.editPhoto;
    /*
    this.imgSvc.getImages().then(async response => {
        const url = await getDownloadURL(response.items[0]);
        this.imageUrl = url  
    }).catch(error => console.log(error)).finally(()=>{
      let desc:Description = new Description(this.text, this.title, this.imageUrl);  
      this.updateDescription(this.id, desc)
    })*/
  }

  onDeletePhoto():void{
    this.editPhoto = !this.editPhoto;
    this.imageUrl = "#";
    let desc:Description = new Description(this.text, this.title, this.imageUrl);
    this.updateDescription(this.id, desc);
    this.loading.show()
    setTimeout(()=> this.loading.hide(), 2000)

  }

//--------------atributos------------

id!:BigInt;
text!: String;
editPhoto: boolean = true;
onEditText: boolean = true;
form: FormGroup;
title!:String;
file!:any;

imageUrl!:String;

uploadPercent!: Observable<any>;
downloadURL!: Observable<string>;

}




