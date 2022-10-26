import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Description } from 'app/model/Description';
import { DescriptionService } from 'app/services/http/description.service';
import { UploadFilesService } from 'app/services/upload-files.service';




@Component({
  selector: 'app-profile-info-edit',
  templateUrl: './profile-info-edit.component.html',
  styleUrls: ['./profile-info-edit.component.css']
})
export class ProfileInfoEditComponent implements OnInit {

  constructor(private readonly formBuilder : FormBuilder, private readonly descHttpSvc:DescriptionService,
    private uploadImgSvc: UploadFilesService) {
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
        this.title = data[0].title
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

    console.log(this.file)
    //this.uploadImgSvc.uploadFiles(file);

  }






  onEditButtom():void{
    this.editPhoto = !this.editPhoto;
    const formText = this.form.value;
    this.title = formText.title;
    this.text = formText.text;
    alert(this.text)
    this.onEditText = true;
    let desc:Description = new Description(this.text, this.title, this.photo);
    this.updateDescription(this.id, desc);
  
  }

  onSubmitPhoto():void{
    this.editPhoto = true;
    let desc:Description = new Description(this.text, this.title, this.photo);
    this.updateDescription(this.id, desc);

  }

  onDeletePhoto():void{
    this.editPhoto = !this.editPhoto;
    this.photo = "";
    let desc:Description = new Description(this.text, this.title, this.photo);
    this.updateDescription(this.id, desc);

  }

//--------------atributos------------

id!:BigInt;
text!: String;
editPhoto: boolean = true;
onEditText: boolean = true;
form: FormGroup;
title!:String;
photo!:String;
file!:any;

}


