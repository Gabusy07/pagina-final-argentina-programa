import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { RegisterService } from '@shared/register.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  constructor( private router: Router, private formService: RegisterService ) { }

  ngOnInit(): void {
    
  }

  // revisar para luego cambiar a un metodo post

  submitSignIn(){
    this.router.navigate(['home']);

  }

  closeForm (){
    this.formService.openingForm();

  }
  
  email = new FormControl("");
  user = new FormControl("");
  password = new FormControl("");


}
