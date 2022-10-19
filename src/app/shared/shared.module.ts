import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import * as fromComponents from './components';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoaderComponent } from './loader/loader.component';
import { ArrowComponent } from './arrow/arrow.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule(
  {
  
  declarations: [...fromComponents.components, ErrorPageComponent, LoaderComponent, ArrowComponent, UserProfileComponent],
  imports: [
    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  
  exports:  [
    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...fromComponents.components,
 
  ]
}
)
export class SharedModule {
  
 }
