
import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '@layout/about/about.component';
import { ProjectsContainerComponent } from '@layout/home/projects-container/projects-container.component';

import { WelcomeComponent } from '@layout/welcome/welcome.component';
import { ErrorPageComponent } from 'app/shared_/error-page/error-page.component';
import { LoginSuccessGuard } from './guards/login-success.guard';
import { HomeComponent } from './layout/home/home.component';
import { ProfileUserComponent } from './shared_/profile-user/profile-user.component';
import { HomeEditComponent } from '@layout/admin/home-edit/home-edit.component';
import { AboutEditComponent } from '@layout/admin/about-edit/about-edit.component';
import { ProjectsEditComponent } from '@layout/admin/projects-edit/projects-edit.component';
import { AdminRolGuard } from './guards/admin-rol.guard';



const routes: Routes =[
  {path : '',  component : WelcomeComponent,},
  {path : 'home', component : HomeComponent, canActivate:[LoginSuccessGuard]},
  {path : 'about', component : AboutComponent, canActivate:[LoginSuccessGuard]},
  {path : 'projects', component : ProjectsContainerComponent, canActivate:[LoginSuccessGuard]},
  {path : 'profile', component : ProfileUserComponent, canActivate:[LoginSuccessGuard]},
  {path : 'admin/home', component : HomeEditComponent, canActivate:[AdminRolGuard]},
  {path : 'admin/about', component : AboutEditComponent, canActivate:[AdminRolGuard]},
  {path : 'admin/projects', component : ProjectsEditComponent, canActivate:[AdminRolGuard]},
  
  {path: '**', component: ErrorPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }