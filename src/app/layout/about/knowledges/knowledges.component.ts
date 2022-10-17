import { Component, OnInit } from '@angular/core';
import { Language } from 'app/model/Language';
import { LanguageService } from 'app/services/http/language.service';

@Component({
  selector: 'app-knowledges',
  templateUrl: './knowledges.component.html',
  styleUrls: ['./knowledges.component.css']
})
export class KnowledgesComponent implements OnInit {

  constructor(private readonly http_svc: LanguageService) {

    this.languages = [
      [{nn : "Python",
      progressBar : "progress-bar",
      width : 82
      },
      {nn : "JavaScript",
      progressBar : "progress-bar",
      width: 55
      }],
      [{nn : "HTML",
      progressBar : "progress-bar",
      width : 76
      },
      {nn : "CSS",
      progressBar : "progress-bar",
      width: 65
      }],
      [{nn : "Bootstrap",
      progressBar : "progress-bar",
      width : 45
      },
      {nn : "Angular",
      progressBar : "progress-bar",
      width : 40
      }],
      [{nn : "Java",
      progressBar : "progress-bar",
      width: 15
      },
      {nn : "Spring Boot",
      progressBar : "progress-bar",
      width : 7
      }],
      [{nn : "GIT",
      progressBar : "progress-bar",
      width: 25
      },
      {nn : "GitHub",
      progressBar : "progress-bar",
      width : 30
      },{nn : "MySql",
      progressBar : "progress-bar",
      width: 35
      }]
      
    ]

    this.progressBarColor(this.languages)
    
   }

  ngOnInit(): void {

  }

  progressBarColor(objList:any[]){
    for (let languagesList of objList){
      for (let language of languagesList){
        let exp = language.width;
        switch (true) {
          case exp <= 25:
            language.progressBar += " bg-danger";
          break;
          case exp  <= 50:
            language.progressBar += " bg-warning"; 
            break;
          
          case exp <= 75:
            language.progressBar += " bg-primary"; 
            break;
          default:
            language.progressBar += " bg-success";
            break;
      }

      }
      
        
    }

  }

  addLang(){
    let langa = new Language("ingles", "2020-11-10")
    this.http_svc.createLanguage(langa).subscribe({
      next: data => {setTimeout (() => alert ("lenguaje guardado con exito"), 500)
    },
      error: error => console.log (error),
    });
  }

  delLang(id: string){
    const idB = BigInt(id);
    this.http_svc.deleteLanguage(idB).subscribe({
      next: data => {setTimeout (() => alert ("lenguaje borrado con exito"), 500)
    },
      error: error => console.log (error),
    });

  }

  getAllLang(){
    this.http_svc.getAll().subscribe({
      next: data => {setTimeout (() => console.log (data), 500)
    },
      error: error => console.log (error),
    });

  }


 languages: any[];
}
