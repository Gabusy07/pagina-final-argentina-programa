import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import * as fromComponents from './components';

@NgModule(
  {
  
  declarations: [...fromComponents.components],
  imports: [
    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  
  exports:  [
    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...fromComponents.components
  ]
}
)
export class SharedModule {
  
 }
