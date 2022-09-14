
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '@layout/about/about.component';
import { ProjectsContainerComponent } from '@layout/home/projects-container/projects-container.component';
import { WelcomeComponent } from '@layout/welcome/welcome.component';
import { ErrorPageComponent } from '@shared/error-page/error-page.component';
import { HomeComponent } from './layout/home/home.component';


const routes: Routes =[
  {path : '', component : WelcomeComponent},
  {path : 'home', component : HomeComponent},
  {path : 'about', component : AboutComponent},
  {path : 'projects', component : ProjectsContainerComponent},
  {path: '**', component: ErrorPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }