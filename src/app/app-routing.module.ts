
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { RedirectGuard } from './guards/redirect.guard';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { AdminUserGuard } from './guards/admin-user.guard';
import { DataProjectsResolver } from './services/resolvers/data-projects.resolver';


const routes: Routes =[
  {path: '',component: WelcomeComponent ,pathMatch: 'full', canActivate:[RedirectGuard]},
  {path : 'home', component : HomeComponent, canActivate: [LoginSuccessGuard]},
  {path : 'register-template', component: RegisterFormComponent},
  {path : 'about', component : AboutComponent},
  {path : 'projects', component : ProjectsContainerComponent},
  {path : 'profile', component : ProfileUserComponent, canActivate:[LoginSuccessGuard]},
  {path : 'admin/home', component : HomeEditComponent, canActivate:[LoginSuccessGuard], resolve: {data:DataProjectsResolver}},
  {path : 'admin/about', component : AboutEditComponent, canActivate:[LoginSuccessGuard]},
  {path : 'admin/projects', component : ProjectsEditComponent, canActivate:[LoginSuccessGuard]},
  {path : 'register', component : RegisterFormComponent, canActivate:[AdminUserGuard]},

  {path: '**', component: ErrorPageComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}