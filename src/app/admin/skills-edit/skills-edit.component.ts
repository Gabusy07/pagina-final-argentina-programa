import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

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

  
  constructor() {
    for (let i=0; i<this.listOfSkills.length; i++){
      this.stateDiv.push("state1");
    }
    console.log(this.stateDiv)
  
   }

  ngOnInit(): void {
  }


  // agranda el div de una skill
  enlarge(index: number){
     this.stateDiv[index] = "estado2" ;
  }

  // achica el div de una skill
  reduce(index: number){
    this.stateDiv[index] =  "estado1";
  }


  listOfSkills:string[] = ["ingles(B2)", "aservito", "comprometido", "proactivo"];
  stateDiv: string[] = [];

  

}

