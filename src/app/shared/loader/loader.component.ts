import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loader',
  template: `<div *ngIf="isLoading$ | async" class="overlay">
  <span class="loader">Load&nbsp;ng</span>
</div>`
  ,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private readonly loaderSVC: LoadingService) { }

  ngOnInit(): void {
  }

  isLoading$ = this.loaderSVC.isLoading$;

}
