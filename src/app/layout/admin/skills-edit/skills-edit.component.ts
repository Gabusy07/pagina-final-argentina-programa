import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SkillService } from 'app/services/http/skill.service';
import { Skill } from 'app/model/Skill';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/http/auth.service';
import swal from 'sweetalert';
import { Router } from '@angular/router';

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

  
  constructor(
    private readonly skillSvc: SkillService,
    private toastr:ToastrService,
    private readonly _authHTTP:AuthService,
    private router: Router,
    ) {
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
      next: data =>  this.listOfSkills = data,
      complete: ()=> this.isLenOfListOfSkillShort = this.listOfSkills.length < 4
    })
   }

   private addSkill(skill:Skill):void{ 
    this.skillSvc.createSkill(skill).subscribe({
      complete: ()=> window.location.reload()
    })

   }

   private deleteSkill(id:number):void{
    this.skillSvc.deleteSkill(id).subscribe({
      next: data=> console.log(data),
      error: error => this.toastr.error("No se han podido completar la acción", "error")
    })

   }

   private updateSkill(id:number, editedSkill: Skill):void{
    this.skillSvc.updateSkill(id, editedSkill).subscribe({
      next: ()=> this.toastr.success("", "Guardado"),
      error: error => this.toastr.error("No se han guardado los cambios", "error")

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
    this.deleteTrash = !this.deleteTrash;

  }

  onDeleteButtom(index:number, id:number):void{  //funcion en html, llama a funcion crud

    if (confirm("seguro quieres eliminar "+this.listOfSkills[index].name+"?")){
      this.deleteSkill(id);
    }
    window.location.reload()

  }

  onEditButtom(index:number, id:number):void{  //llama a funcion crud. Los argumentos son los indices de la lista de pares y el id del obj
    
    let editedName: any = document.getElementById(index+'div')?.innerText.toString();
    editedName == undefined? " ": editedName;
    this.editedSkill.name = editedName;
    this.editPen = !this.editPen;
    this.deleteTrash = false;
    let skillEditable = document.getElementById(index+"div");
    skillEditable?.setAttribute("contenteditable", "false");
    skillEditable?.setAttribute("autofocus", "false");
    if (confirm("seguro quieres guardar lo cambios?")){
      this.updateSkill(id, this.editedSkill);
    }  
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

