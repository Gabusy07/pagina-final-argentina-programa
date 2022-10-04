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


  div1 = "estado1";
  div2 = "estado1";
  div3 = "estado1";
  div4 = "estado1";
  arrayDivs: any[] = [this.div1, this.div2, this.div3, this.div4];
  
  constructor() {
  
   }

  ngOnInit(): void {
  }


  // agranda el div de una skill
  enlarge(index: number){
     this.arrayDivs[index] = "estado2" ;
  }

  // achica el div de una skill
  reduce(index: number){
    this.arrayDivs[index] =  "estado1";
  }

  

}

