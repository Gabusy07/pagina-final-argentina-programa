import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-knowledges-edit',
  templateUrl: './knowledges-edit.component.html',
  styleUrls: ['./knowledges-edit.component.css']
})
export class KnowledgesEditComponent implements OnInit {

  constructor(private readonly formBuilder : FormBuilder) {

    this.datePickerId =new Date().toISOString().substring(0, 10);
    console.log(this.datePickerId)
    this.knwForm = this.initKnwForm();


    this.languages = [
      [{nn : "Python",
      progressBar : "progress-bar",
      width : 82
      },
      {nn : "JavaScript",
      progressBar : "progress-bar",
      width: 55
      }],
      [{nn : "HTML",
      progressBar : "progress-bar",
      width : 76
      },
      {nn : "CSS",
      progressBar : "progress-bar",
      width: 65
      }],
      [{nn : "Bootstrap",
      progressBar : "progress-bar",
      width : 45
      },
      {nn : "Angular",
      progressBar : "progress-bar",
      width : 40
      }],
      [{nn : "Java",
      progressBar : "progress-bar",
      width: 15
      },
      {nn : "Spring Boot",
      progressBar : "progress-bar",
      width : 7
      }],
      [{nn : "GIT",
      progressBar : "progress-bar",
      width: 25
      },
      {nn : "GitHub",
      progressBar : "progress-bar",
      width : 30
      },{nn : "MySql",
      progressBar : "progress-bar",
      width: 35
      }]
      
    ]

    this.progressBarColor(this.languages)
    
   }

  ngOnInit(): void {

  }

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
    this.openKnwForm = false;
    alert("datos guardados");

  }

  onEditPen(i:number, j:number):void{
    
    this.indexsEditLang = [i, j];
    this.editPen = this.editPen == false ? true : false;

  }

  onDeleteTrash(i:number, j:number):void{
    this.indexsDeleteLang = [i, j];
    this.deleteTrash = this.deleteTrash == false ? true : false;

  }

  onDeleteButtom(i:number, j:number):void{  //los argumentos son los indices de la lista de pares y del obj en esta ultima
    
    this.languages = this.languages.splice(i);
    console.log(this.languages)
    window.location.reload()

  }

  onAddSquare():void{
    this.openKnwForm =true;

  }

  onCloseKnwForm():void{
    this.openKnwForm = false;

  }






  progressBarColor(objList:any[]){
    for (let languagesList of objList){
      for (let language of languagesList){
        let exp = language.width;
        switch (true) {
          case exp <= 25:
            language.progressBar += " bg-danger";
          break;
          case exp  <= 50:
            language.progressBar += " bg-warning"; 
            break;
          
          case exp <= 75:
            language.progressBar += " bg-primary"; 
            break;
          default:
            language.progressBar += " bg-success";
            break;
      }

      }
      
        
    }

  }

  indexsDeleteLang: number[] =[NaN,NaN];
  indexsEditLang: number[] =[NaN,NaN];
  datePickerId: String;
  languages: any[];
  openKnwForm:boolean = false;
  editPen:boolean = false;
  deleteTrash:boolean = false;
  knwForm: FormGroup;
}


