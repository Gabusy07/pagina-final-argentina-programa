import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-knowledges',
  templateUrl: './knowledges.component.html',
  styleUrls: ['./knowledges.component.css']
})
export class KnowledgesComponent implements OnInit {

  constructor() {

    this.languages = [
      [{nn : "Python",
      progressBar : "progress-bar bg-success",
      width : "90%"
      },
      {nn : "JavaScript",
      progressBar : "progress-bar bg-primary",
      width: "52%"
      }],
      [{nn : "HTML",
      progressBar : "progress-bar bg-success",
      width : "75%"
      },
      {nn : "CSS",
      progressBar : "progress-bar bg-primary",
      width: "62%"
      }],
      [{nn : "Bootstrap",
      progressBar : "progress-bar bg-warning",
      width : "45%"
      },
      {nn : "Angular",
      progressBar : "progress-bar bg-warning",
      width : "35%"
      }],
      [{nn : "Java",
      progressBar : "progress-bar bg-danger",
      width: "10%"
      },
      {nn : "Spring Boot",
      progressBar : "progress-bar bg-danger",
      width : "1%"
      }],
      [{nn : "GIT",
      progressBar : "progress-bar bg-danger",
      width: "23%"
      },
      {nn : "GitHub",
      progressBar : "progress-bar bg-warning",
      width : "30%"
      }]
      
    ]
    
   }

  ngOnInit(): void {

  }

 languages: any[];
  
 
}
