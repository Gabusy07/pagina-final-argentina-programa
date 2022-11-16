
import { animate, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Skill } from 'app/model/Skill';
import { AuthService } from 'app/services/http/auth.service';
import { SkillService } from 'app/services/http/skill.service';
import swal from 'sweetalert';

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

  constructor(private readonly skillSvc: SkillService, private router: Router, private readonly _authHTTP:AuthService) {
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
    this._authHTTP.isLogged().subscribe({
      error: ()=>{
        swal({
          title: "Servidor",
          text: "Error al cargar datos desde el servidor \n o su sesión ha expirado",
          icon: "info",
          timer: 3000,
        })
        this.router.navigate([''])
      }
    }
    )

    this.skillSvc.getAll().subscribe({
      next: data =>  {
        this.listOfSkills = data},
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

