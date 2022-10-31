import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projects-container',
  templateUrl: './projects-container.component.html',
  styleUrls: ['./projects-container.component.css']
})
export class ProjectsContainerComponent implements OnInit {

  constructor(private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  projectAlertMessage(){
    this.toastr.info("projecto en construcción", "No disponible");

  }

}
