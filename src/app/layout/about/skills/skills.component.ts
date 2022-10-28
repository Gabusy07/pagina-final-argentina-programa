
import { animate, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Skill } from 'app/model/Skill';
import { SkillService } from 'app/services/http/skill.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  animations: [
    trigger('animation1', [
      state('estado1', style({transform : 'scale(1)',})),
      state('estado2', style({transform : 'scale(1.1)', boxShadow: '5px 3px 3px gray', 
      filter: 'brightness(1.009)'})),
      transition('estado1 <=> estado2', animate('0.08s'))
    ])

   ] 
   
})

export class SkillsComponent implements OnInit {

  constructor(private readonly skillSvc: SkillService) {
    for (let i=0; i<this.listOfSkills.length; i++){
      this.stateDiv.push("state1");
    }
  
   }

  ngOnInit(): void {
    this.getAllSkill();
  }

  /*-----------------------------
   CRUD READ
   */


   private getAllSkill(){
    this.skillSvc.getAll().subscribe({
      next: data =>  this.listOfSkills = data,
      error: error => console.log(error),
      complete: ()=> this.isLenOfListOfSkillShort = this.listOfSkills.length < 4
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

  //-------------atributos--------------


  listOfSkills:Skill[] = [];
  isLenOfListOfSkillShort:boolean = false;
  stateDiv: string[] = [];

  

}

