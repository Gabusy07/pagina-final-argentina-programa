import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';

import { WelcomeComponent } from './layout/welcome/welcome.component';
import { CalculatorComponent } from './shared/components/calculator/calculator.component';

import { ReactiveFormsModule } from "@angular/forms";

import { KnowledgesComponent } from './layout/about/knowledges/knowledges.component';

import { CoreModule } from './core/core.module';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AsideComponent } from './layout/home/aside/aside.component';
import { AboutComponent } from '@layout/about/about.component';
import { PorterComponent } from './layout/home/porter/porter.component';
import { SkillsComponent } from '@layout/about/skills/skills.component';
import { ProjectsContainerComponent } from '@layout/home/projects-container/projects-container.component';
import { RegisterFormComponent } from '@layout/welcome/register-form/register-form.component';
import { BEndService } from "../app/services/b-end.service";
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './layout/welcome/login-form/login.component';
import { LoaderComponent } from '@shared/loader/loader.component';




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
    ProjectsContainerComponent,
    LoginComponent,
    LoaderComponent
 
  ],
  imports: [
    
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    HttpClientModule,
  ],
  exports: [RouterModule],

  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
  }, BEndService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

