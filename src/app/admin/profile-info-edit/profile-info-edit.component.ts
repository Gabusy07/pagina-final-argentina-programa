import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-info-edit',
  templateUrl: './profile-info-edit.component.html',
  styleUrls: ['./profile-info-edit.component.css']
})
export class ProfileInfoEditComponent implements OnInit {

  constructor(private readonly formBuilder : FormBuilder) {
    this.form = this.initForm();

   }

  ngOnInit(): void {
    this.text = ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam tempora adipisci amet numquam officiis pariatur! Eveniet eius fugit aliquid porro obcaecati eos nihil? Expedita,\
    accusamus voluptate fuga fugit nihil enim? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor recusandae veniam repellat fugiat temporibus rem, illum impedit enim dignissimos aspernatur\
     ab fuga neque, unde qui autem. Ab quae\
     laboriosam dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quia harum natus, enim blanditiis\
     in porro illo laudantium, aliquam iusto quisquam possimus temporibus provident tenetur fugit tempore eligendi quis ratione!\
   Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate soluta, iusto corrupti ipsum nostrum illo nobis veritatis numquam id atque aspernatur accusantium sint iure? Et ab amet quo nulla voluptate?\
Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque officia eius quo ad! Aliquid odit, animi autem repellendus ratione, ut, inventore incidunt natus perferendis facilis magnam. Commodi ipsa aperiam repellat!'
   
}

 //construccion del reactiveForm
 initForm(): FormGroup{
  return this.formBuilder.group({
    text: ["",[Validators.required, Validators.minLength(12), Validators.maxLength(100)]],
  })

}

get Text(): any{
  return this.form.get('text');
}

//para editar el texto descriptivo principal 
textEditPen(){
    this.onEditText = this.onEditText == false ? true : false;

  }

  onSubmitText(){
    const formText = this.form.value;
    this.text = formText.text;
    this.onEditText = true;

  }

  /*  -----------------------------
  para cambiar la foto de perfil*/
  photoEditPen():void{
    this.onEditPhoto = this.onEditPhoto == false ? true : false;
    console.log(this.urlPhoto)

  }

  onSubmitPhoto():void{ 
    this.onEditPhoto = true;

  }

  onDeletePhoto():void{
    this.onEditPhoto = this.onEditPhoto == false ? true : false;
    this.urlPhoto = "";

  }



  text: any = "";
  urlPhoto: string = "";
  onEditPhoto: boolean = true;
  onEditText: boolean = true;
  form: FormGroup;

}



