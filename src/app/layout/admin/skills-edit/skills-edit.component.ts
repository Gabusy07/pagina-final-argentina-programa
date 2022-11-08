import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SkillService } from 'app/services/http/skill.service';
import { Skill } from 'app/model/Skill';
import { ToastrService } from 'ngx-toastr';

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

  
  constructor(private readonly skillSvc: SkillService, private toastr:ToastrService) {
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


   private getAllSkill(){
    this.skillSvc.getAll().subscribe({
      next: data =>  this.listOfSkills = data,
      error: error => console.log(error),
      complete: ()=> this.isLenOfListOfSkillShort = this.listOfSkills.length < 4
    })
   }

   private addSkill(skill:Skill):void{
    
    this.skillSvc.createSkill(skill).subscribe({
      error: error=> console.log(error),
      complete: ()=> window.location.reload()
    })

   }

   private deleteSkill(id:BigInt):void{
    this.skillSvc.deleteSkill(id).subscribe({
      next: data=> console.log(data),
      error: error => console.log(error)
    })

   }

   private updateSkill(id:BigInt, editedSkill: Skill):void{
    this.skillSvc.updateSkill(id, editedSkill).subscribe({
      next: ()=> this.toastr.success("", "Guardado"),
      error: error => console.log(error)

    })
   }

//--------------------------------------
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
    this.editPen = this.editPen = !this.editPen;
    this.deleteTrash = false;
    let skillEditable = document.getElementById(index+"div");
    if (this.editPen){
      skillEditable?.setAttribute("contenteditable", "true");
    }else{
      skillEditable?.setAttribute("contenteditable", "false");
      skillEditable?.autofocus;
    }
    

  }

  onAddButtom(){
    this.isAddSkillFormVisible= !this.isAddSkillFormVisible;
  }

  inputSkill(event: Event){
    this.newSkill.name = (<HTMLInputElement>event.target).value;
  }

  onSubmitButtom():void{
    this.addSkill(this.newSkill);
  }

  onDeleteTrash(index:number):void{ //icono eliminar
    this.indexSkill = index;
    this.editPen =  false;
    this.deleteTrash = this.deleteTrash == false ? true : false;

  }

  onDeleteButtom(index:number, id:BigInt):void{  //funcion en html, llama a funcion crud

    if (confirm("seguro quieres eliminar "+this.listOfSkills[index].name+"?")){
      this.deleteSkill(id);
    }
    window.location.reload()

  }

  onEditButtom(index:number, id:BigInt):void{  //llama a funcion crud. Los argumentos son los indices de la lista de pares y el id del obj
    
    let editedName: any = document.getElementById(index+'div')?.innerText.toString();
    editedName == undefined? " ": editedName;
    this.editedSkill.name = editedName;
    this.editPen = this.editPen == false ? true : false;
    this.deleteTrash = false;
    let skillEditable = document.getElementById(index+"div");
    skillEditable?.setAttribute("contenteditable", "false");
    skillEditable?.setAttribute("autofocus", "false");
    if (confirm("seguro quieres guardar lo cambios?")){
      this.updateSkill(id, this.editedSkill);
    }
    
  }

  onCloseForm():void{

  }

  isLenOfListOfSkillShort:boolean = false;
  listOfSkills:Skill[] = [];
  stateDiv: string[] = [];
  indexSkill: number =NaN;
  editPen:boolean = false;
  isAddSkillFormVisible:boolean = false;
  deleteTrash:boolean = false;
  newSkill: Skill = new Skill();
  editedSkill:Skill = new Skill();
 

}

