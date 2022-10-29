import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Language } from 'app/model/Language';
import { LanguageService } from 'app/services/http/language.service';
import swal from 'sweetalert';

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

  createObjForList(responseList: Language[]):void{
    let list: Language[] = [];
    for(let i=0; i<= responseList.length; i+=2){
      if (i+1 > responseList.length){
        return;
      }
      if (i == responseList.length-1){
        this.languages.push([responseList[i]])
        return;
      }
      this.languages.push([responseList[i], responseList[i+1]])
    }
   
  }


  addLang(lang:Language){
    this.http_svc.createLanguage(lang).subscribe({
      next: ()=> alert("datos guardados con exito"),
      error: error => {
        console.log(error);
        alert ("no se han podido guardar los datos")
      },
      complete: ()=> window.location.reload()

  });
    
    
  }

  delLang(id: BigInt){
    this.http_svc.deleteLanguage(id).subscribe({
      next: data => {setTimeout (() => alert ("lenguaje borrado con exito"), 500)
    },
      error: error => console.log (error),
    });

  }

  getAllLang():void{
    this.http_svc.getAll().subscribe({
      next: data =>  this.resultGetAll = data,
      error: error => swal({
        title: "Servidor",
        text: "No se ha podido conectar con el servidor",
        icon: "info",
        timer: 3000,
      }),
      /* asegura que la peticion al servidor se haya completado y llama a
      la funcion que carga en una nueva lista para mejor lectura en html */
      complete: ()=> this.createObjForList(this.resultGetAll)
    });
  }

  updateLang(id:BigInt, langEdited:Language):void{
    this.http_svc.updateLanguage(id, langEdited).subscribe({
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


  submitAddForm(){
    const f = this.knwForm.value;
    let name = f.name.charAt(0).toUpperCase() + f.name.slice(1);;
    const lang = new Language(name, f.date);
    this.addLang(lang)
    this.openKnwForm = false;
  }


  onEditPen(i:number, j:number):void{
    
    this.indexsEditLang = [i, j];
    this.editPen = !this.editPen
    this.deleteTrash = false;

  }


  onDeleteTrash(i:number, j:number):void{
    this.indexsDeleteLang = [i, j];
    this.deleteTrash = !this.deleteTrash;
    this.editPen = false;

  }

  onEditButtom(i:number, j:number):void{  //los argumentos son los indices de la lista de pares y del obj en esta ultima
    
    const oldLang = this.languages[i][j]
    const f = this.knwForm.value;
    //asegura que se hayan realizado cambios en form y sino guarda los antiguos
    let name = f.name? f.name.charAt(0).toUpperCase() + f.name.slice(1): oldLang.name;
    let date = f.date? f.date: oldLang.date_start;
    const lang = new Language(name, date);
    this.updateLang(oldLang.id, lang)
    window.location.reload();

  }

  onDeleteButtom(i:number, j:number):void{  //los argumentos son los indices de la lista de pares y del obj en esta ultima
    
    this.delLang(this.languages[i][j].id);
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
  resultGetAll: Language []=[];
  indexsDeleteLang: number[] =[NaN,NaN];
  indexsEditLang: number[] =[NaN,NaN];
  datePickerId: String;
  openKnwForm:boolean = false;
  editPen:boolean = false;
  deleteTrash:boolean = false;
  knwForm: FormGroup;
}


