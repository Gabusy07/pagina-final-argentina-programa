import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Language } from 'app/model/Language';
import { LanguageService } from 'app/services/http/language.service';

@Component({
  selector: 'app-knowledges',
  templateUrl: './knowledges.component.html',
  styleUrls: ['./knowledges.component.css']
})
export class KnowledgesComponent implements OnInit {

  constructor(private readonly http_svc: LanguageService) {
 
   }


  ngOnInit(): void {
    this.getAllLang();
  }

  
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


 languages: Language[][] = [];
 resultGetAll: Language []=[]  ;
}
