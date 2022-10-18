import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Language } from 'app/model/Language';
import { LanguageService } from 'app/services/http/language.service';

@Component({
  selector: 'app-knowledges-edit',
  templateUrl: './knowledges-edit.component.html',
  styleUrls: ['./knowledges-edit.component.css']
})
export class KnowledgesEditComponent implements OnInit {

  constructor(private readonly formBuilder : FormBuilder, private readonly http_svc: LanguageService) {

    this.datePickerId =new Date().toISOString().substring(0, 10);
    this.knwForm = this.initKnwForm();
    
   }

  ngOnInit(): void {
    this.getAllLang();

  }

  /*-----------------------------------------------------
  funciones dde conexion al servidor
  */

  createObjForList(langList: Language[]):void{
    let list: Language[] = [];
    for(let i=0; i<= langList.length; i++){
      if(i == langList.length-1){
        this.languages.push([langList[langList.length-1]])

      }
      else if(list.length > 1){
        this.languages.push(list);
        list = [];
      }else{
        list.push(langList[i])
      }
    }
   
  }


  addLang(lang:Language){
    
    this.http_svc.createLanguage(lang).subscribe({
      next: data => {setTimeout (() => alert ("lenguaje guardado con exito"), 500)
    },
      error: error => console.log (error),
    });
  }

  delLang(id: string){
    const idB = BigInt(id);
    this.http_svc.deleteLanguage(idB).subscribe({
      next: data => {setTimeout (() => alert ("lenguaje borrado con exito"), 500)
    },
      error: error => console.log (error),
    });

  }

  getAllLang():void{
    let response = this.http_svc.getAll().subscribe({
      next: data => { this.resultGetAll = data;
    },
      error: error => console.log (error),
      /* asegura que la peticion al servidor se haya completado y llama a
      la funcion que carga en una nueva lista para mejor lectura en html */
      complete: ()=> this.createObjForList(this.resultGetAll)
    });
}


  /*------------------------------------------------------
  formulario y funciones de edicion
  */

   //construccion del reactiveForm
   initKnwForm(): FormGroup{
    return this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      date: ['',[Validators.required]],
    })

  }

  get Name (){
    return this.knwForm.get('name');

  }

  get Date (){
    return this.knwForm.get('date');

  }

  submitForm(){
    const f = this.knwForm.value;
    const lang = new Language(f.name, f.date);
    console.log(lang)
    this.http_svc.createLanguage(lang).subscribe({
      next: ()=> alert("datos guardados con exito"),
      error: error => {
        console.log(error);
        alert ("no se han podido gardar los datos")
      },
      complete: ()=> window.location.reload()

  });
    this.openKnwForm = false;
  }


  onEditPen(i:number, j:number):void{
    
    this.indexsEditLang = [i, j];
    this.editPen = this.editPen == false ? true : false;
    this.deleteTrash = false;

  }


  onDeleteTrash(i:number, j:number):void{
    this.indexsDeleteLang = [i, j];
    this.deleteTrash = this.deleteTrash == false ? true : false;
    this.editPen = false;

  }


  onDeleteButtom(i:number, j:number):void{  //los argumentos son los indices de la lista de pares y del obj en esta ultima
    
    window.location.reload();

  }

  onAddSquare():void{
    this.openKnwForm =true;

  }

  onCloseKnwForm():void{
    this.openKnwForm = false;

  }

  disableSelectedButtoms(){
    this.editPen = false;
    this.openKnwForm = false;
    this.deleteTrash = false;
  }


  languages: Language[][] = [];
  resultGetAll: Language []=[]  ;
  indexsDeleteLang: number[] =[NaN,NaN];
  indexsEditLang: number[] =[NaN,NaN];
  datePickerId: String;
  openKnwForm:boolean = false;
  editPen:boolean = false;
  deleteTrash:boolean = false;
  knwForm: FormGroup;
}


