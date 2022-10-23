import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SkillService } from 'app/services/http/skill.service';
import { Skill } from 'app/model/Skill';

@Component({
  selector: 'app-skills-edit',
  templateUrl: './skills-edit.component.html',
  styleUrls: ['./skills-edit.component.css'],
  animations: [
    trigger('animation1', [
      state('estado1', style({transform : 'scale(1)',})),
      state('estado2', style({transform : 'scale(1.1)', boxShadow: '5px 3px 3px gray', 
      filter: 'brightness(1.009)'})),
      transition('estado1 <=> estado2', animate('0.08s'))
    ])

   ] 
})
export class SkillsEditComponent implements OnInit {

  
  constructor(private readonly skillSvc: SkillService) {
    for (let i=0; i<this.listOfSkills.length; i++){
      this.stateDiv.push("state1");
    }
  
   }

  ngOnInit(): void {
    this.getAllSkill();
  }

  /*-----------------------------
   CRUD
   */


   getAllSkill(){
    this.skillSvc.getAll().subscribe({
      next: data =>  this.listOfSkills = data,
      error: error => console.log(error),
      complete: ()=> console.log(this.listOfSkills)
    })
   }





  


  // agranda el div de una skill
  enlarge(index: number){
     this.stateDiv[index] = "estado2" ;
  }

  // achica el div de una skill
  reduce(index: number){
    this.stateDiv[index] =  "estado1";
  }

  onEditPen(index:number):void{ //icono editar
    this.indexSkill = index;
    this.editPen = this.editPen == false ? true : false;
    this.deleteTrash = false;
    let skillEditable = document.getElementById(index+"div");
    if (this.editPen){
      skillEditable?.setAttribute("contenteditable", "true");
    }else{
      skillEditable?.setAttribute("contenteditable", "false");
      skillEditable?.autofocus;
    }
    

    
    

  }

  onDeleteTrash(index:number):void{ //icono eliminar
    this.indexSkill = index;
    this.editPen =  false;
    this.deleteTrash = this.deleteTrash == false ? true : false;

  }

  onDeleteButtom(i:number):void{  //los argumentos son los indices de la lista de pares y del obj en esta ultima
    
    this.listOfSkills = this.listOfSkills.splice(i);
    window.location.reload()

  }

  onEditButtom(index:number):void{  //los argumentos son los indices de la lista de pares y del obj en esta ultima
    
    this.editPen = this.editPen == false ? true : false;
    this.deleteTrash = false;
    let skillEditable = document.getElementById(index+"div");
    skillEditable?.setAttribute("contenteditable", "false");
    skillEditable?.setAttribute("autofocus", "false");
    

  }


  listOfSkills:Skill[] = [];
  stateDiv: string[] = [];
  indexSkill: number =NaN;
  editPen:boolean = false;
  deleteTrash:boolean = false;

  

}

