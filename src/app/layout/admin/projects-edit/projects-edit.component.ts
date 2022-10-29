import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.css']
})
export class ProjectsEditComponent implements OnInit {

  constructor(private readonly formBuilder : FormBuilder) {
    this.form = this.initForm();
   }

  ngOnInit(): void {
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


  openForm:boolean = false;
  editPen:boolean = false;
  deleteTrash:boolean = false;
  form:FormGroup;

}
