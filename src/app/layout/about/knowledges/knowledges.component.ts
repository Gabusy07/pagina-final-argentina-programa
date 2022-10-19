
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


  getAllLang():void{
    let response = this.http_svc.getAll().subscribe({
      next: data => { this.resultGetAll = data;
        this.isLoading = true;
    },
      error: error => console.log (error),
      /* asegura que la peticion al servidor se haya completado y llama a
      la funcion que carga en una nueva lista para mejor lectura en html */
      complete: ()=> this.createObjForList(this.resultGetAll)
    });
}

  isLoading: boolean = false;
  languages: Language[][] = [];
  resultGetAll: Language []=[]  ;
}
