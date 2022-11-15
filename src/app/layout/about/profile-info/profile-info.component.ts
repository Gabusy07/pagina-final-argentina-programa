import { Component, OnInit } from '@angular/core';
import { DescriptionService } from 'app/services/http/description.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  constructor(private readonly descHttpSvc: DescriptionService) {
   }

  ngOnInit(): void {
    this.getDescription();
  }

//---------------Read-------------------

private getDescription(){
  this.descHttpSvc.readDescription().subscribe({
    next: data =>  {
      this.text= data[0].text;
      this.title = data[0].title;
      this.imageUrl = data[0].photo;
    },
    error: error => console.log(error),

  })
 }

//--------------atributos------------

text!: String;
title!:String;
imageUrl!:String;

}
