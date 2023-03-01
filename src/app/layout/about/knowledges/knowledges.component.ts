
import { Component, OnInit } from '@angular/core';
import { Knowledge } from 'app/model/Knowledge';
import { KnowledgeService } from 'app/services/http/Knowledge.service';

@Component({
  selector: 'app-knowledges',
  templateUrl: './knowledges.component.html',
  styleUrls: ['./knowledges.component.css']
})
export class KnowledgesComponent implements OnInit {

  constructor(private readonly http_svc: KnowledgeService) {}

  ngOnInit(): void {
    this.getAllKnws();
  }

  
  createObjForList(responseList: Knowledge[]):void{
    let list: Knowledge[] = [];
    for(let i=0; i<= responseList.length; i+=2){
      if (i+1 > responseList.length){
        return;
      }
      if (i == responseList.length-1){
        this.knowledges.push([responseList[i]])
        return;
      }
      this.knowledges.push([responseList[i], responseList[i+1]])
    }
   
  }

  getAllKnws():void{
    this.http_svc.getAll().subscribe({
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
  knowledges: Knowledge[][] = [];
  resultGetAll: Knowledge []=[]  ;
}
