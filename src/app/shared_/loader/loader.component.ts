import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loader',
  template: `<div *ngIf="isLoading$ | async" class="overlay"> <!-- html-->
  <span class="loader">Load&nbsp;ng</span>
</div>`
  ,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private readonly loaderSvc: LoadingService) { }

  ngOnInit(): void {
  }

  isLoading$ = this.loaderSvc.isLoading$;

}
