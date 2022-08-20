import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  constructor() {
    this.scale = false;
   }

  ngOnInit(): void {
  }

  scalling(): void{
    this.scale = this.scale ? false : true;

  }

  scale:boolean;

}
