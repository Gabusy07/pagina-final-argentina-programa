import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { RegisterService } from '@shared/register.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  constructor( private router: Router, private formService: RegisterService, private formBuilder : FormBuilder ) {
    this.form = this.formBuilder.group({
      name: ['',[Validators.required]],
      user: ['',[Validators.required, Validators.pattern('^[a-z0-9_-]{3,16}$')]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(18)]],
    })
   }

  ngOnInit(): void {
    
  }

  get Email(){
    return this.form.get('email');
  }

  get Password(){
    return this.form.get('password');
  }

  get User(){
    return this.form.get('user');
  }

  get Name(){
    return this.form.get('name');
  }

  // revisar para luego cambiar a un metodo post

  submitSignIn(){
    this.router.navigate(['home']);

  }

  closeForm (){
    this.formService.openingForm();

  }
  
  form: FormGroup;
  


}
