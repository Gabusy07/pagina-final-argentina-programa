import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';

import { WelcomeComponent } from './layout/welcome/welcome.component';
import { CalculatorComponent } from './shared/components/calculator/calculator.component';

import { ReactiveFormsModule } from "@angular/forms";

import { KnowledgesComponent } from './layout/about/knowledges/knowledges.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AsideComponent } from './layout/aside/aside.component';
import { AboutComponent } from '@layout/about/about.component';
import { PorterComponent } from './layout/home/porter/porter.component';
import { SkillsComponent } from '@layout/about/skills/skills.component';
import { ProjectsContainerComponent } from '@layout/home/projects-container/projects-container.component';
import { RegisterFormComponent } from '@layout/welcome/register-form/register-form.component';



const appRoutes : Routes = [
 {path : '', component : WelcomeComponent},
 {path : 'home', component : HomeComponent},


];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    WelcomeComponent,
    CalculatorComponent,
    RegisterFormComponent,
    KnowledgesComponent,
    NavigationComponent,
    FooterComponent,
    AsideComponent,
    PorterComponent,
    SkillsComponent,
    ProjectsContainerComponent
   
  ],
  imports: [
    
    BrowserModule,
    BrowserAnimationsModule,
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

