
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '@layout/about/about.component';
import { ProjectsContainerComponent } from '@layout/home/projects-container/projects-container.component';
import { RegisterFormComponent } from '@layout/welcome/register-form/register-form.component';
import { WelcomeComponent } from '@layout/welcome/welcome.component';
import { ErrorPageComponent } from 'app/shared_/error-page/error-page.component';
import { LoginSuccessGuard } from './guards/login-success.guard';
import { HomeComponent } from './layout/home/home.component';
import { ProfileUserComponent } from './shared_/profile-user/profile-user.component';


const routes: Routes =[
  {path : '', component : WelcomeComponent},
  {path : 'home', component : HomeComponent, canActivate:[LoginSuccessGuard]},
  {path : 'about', component : AboutComponent},
  {path : 'projects', component : ProjectsContainerComponent},
  {path : 'profile', component : ProfileUserComponent},
  {path : 'register-form', component : RegisterFormComponent},
  {path: '**', component: ErrorPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }