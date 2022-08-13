import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';

import { WelcomeComponent } from './layout/welcome/welcome.component';
import { CalculatorComponent } from './shared/components/calculator/calculator.component';
import { RegisterFormComponent } from './shared/components/register-form/register-form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SkillsComponent } from './layout/skills/skills.component';
import { KnowledgesComponent } from './layout/knowledges/knowledges.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AsideComponent } from './layout/aside/aside.component';


const appRoutes : Routes = [
 {path : '', component : WelcomeComponent},
 {path : 'home', component : HomeComponent},


];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  
    WelcomeComponent,
    CalculatorComponent,
    RegisterFormComponent,
    SkillsComponent,
    KnowledgesComponent,
    NavigationComponent,
    FooterComponent,
    AsideComponent
   
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [RouterModule],

  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
  }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

