import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Knowledge } from 'app/model/Knowledge';
import { KnowledgeService } from 'app/services/http/Knowledge.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-knowledges-edit',
  templateUrl: './knowledges-edit.component.html',
  styleUrls: ['./knowledges-edit.component.css']
})
export class KnowledgesEditComponent implements OnInit {

  constructor(private readonly formBuilder : FormBuilder, private readonly http_svc: KnowledgeService) {

    this.datePickerId =new Date().toISOString().substring(0, 10);
    this.knwForm = this.initKnwForm();
    
   }

  ngOnInit(): void {
    this.getAllKnws();

  }

  /*-----------------------------------------------------
  funciones dde conexion al servidor
  */

  createObjForList(list: Knowledge[]):Knowledge[][]{
    let resultList:Knowledge[][]=[];
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


  addLang(knw:Knowledge){
    this.http_svc.createKnowledge(knw).subscribe({
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
      complete: ()=> window.location.reload()

  });
    
    
  }

  delKnowledge(id: number){
    this.http_svc.deleteKnowledge(id).subscribe({
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

  getAllKnws():void{
    let list:Knowledge[];
    this.http_svc.getAll().subscribe({
      next: data =>  list = data,
      error: error => swal({
        title: "Servidor",
        text: "No se ha podido conectar con el servidor",
        icon: "info",
        timer: 3000,
      }),
      /* asegura que la peticion al servidor se haya completado y llama a
      la funcion que carga en una nueva lista para mejor lectura en html */
      complete: ()=> this.knowledges = this.createObjForList(list)
    });
  }

  updateKnw(id:number, knwEdited:Knowledge):void{
    this.http_svc.updateKnowledge(id, knwEdited).subscribe({
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
      color: []
    })

  }

  get Name (){
    return this.knwForm.get('name');

  }

  get Date (){
    return this.knwForm.get('date');

  }

  get Color (){
    return this.knwForm.get('color');

  }

  submitAddForm(){
    
    const f = this.knwForm.value;
    let name = f.name.charAt(0).toUpperCase() + f.name.slice(1);;
    const lang = new Knowledge(name, f.date, f.color);
    this.addLang(lang)
    this.openKnwForm = false;
  }


  onEditPen(i:number, j:number):void{
    
    this.indexsEditKnw = [i, j];
    this.editPen = !this.editPen
    this.deleteTrash = false;

  }


  onDeleteTrash(i:number, j:number):void{
    this.indexsDeleteKnw = [i, j];
    this.deleteTrash = !this.deleteTrash;
    this.editPen = false;

  }

  onEditButtom(i:number, j:number):void{  //los argumentos son los indices de la lista de pares y del obj en esta ultima
    
    const oldLang = this.knowledges[i][j]
    const f = this.knwForm.value;
    //asegura que se hayan realizado cambios en form y sino guarda los antiguos
    let name = f.name? f.name.charAt(0).toUpperCase() + f.name.slice(1): oldLang.name;
    let date = f.date? f.date: oldLang.date;
    let color = f.color? f.color: oldLang.progressbar;
    const lang = new Knowledge(name, date, color);
    this.updateKnw(oldLang.id, lang);
    console.log(lang)
    //window.location.reload();

  }

  onDeleteButtom(i:number, j:number):void{  //los argumentos son los indices de la lista de pares y del obj en esta ultima
    
    this.delKnowledge(this.knowledges[i][j].id);
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


  knowledges: Knowledge[][] = [];
  indexsDeleteKnw: number[] =[NaN,NaN];
  indexsEditKnw: number[] =[NaN,NaN];
  datePickerId: String;
  openKnwForm:boolean = false;
  editPen:boolean = false;
  deleteTrash:boolean = false;
  knwForm: FormGroup;
}


