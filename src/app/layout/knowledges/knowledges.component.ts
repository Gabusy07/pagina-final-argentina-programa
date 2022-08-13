import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-knowledges',
  templateUrl: './knowledges.component.html',
  styleUrls: ['./knowledges.component.css']
})
export class KnowledgesComponent implements OnInit {

  constructor() {
    this.allknowledges = [this.python, this.javascript];
   }

  ngOnInit(): void {

  }

  python = [
    "Python", "width: 60","progress-bar bg-success", "width: 60%",
  ]

  javascript =  [
    "JavaScript", "width: 60","progress-bar bg-success", "width: 60%",
  ]

  css = {
    name : "CSS",
    progressPercent : 55,
    color : "progress-bar bg-success",
    maxWidth : "width: 55%",
  }

  html = {
    name : "HTML",
    progressPercent : 75,
    color : "progress-bar bg-success",
    maxWidth : "width: 75%",
  }
  
  allknowledges: string [] []= [];
  
 
}
