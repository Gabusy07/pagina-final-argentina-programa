
import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { AboutComponent } from '@layout/about/about.component';
import { ProjectsContainerComponent } from '@layout/home/projects-container/projects-container.component';
import { RegisterFormComponent } from 'app/auth/register-form/register-form.component';
import { WelcomeComponent } from '@layout/welcome/welcome.component';
import { ErrorPageComponent } from 'app/shared_/error-page/error-page.component';
import { LoginSuccessGuard } from './guards/login-success.guard';
import { HomeComponent } from './layout/home/home.component';
import { ProfileUserComponent } from './shared_/profile-user/profile-user.component';
import { User } from './model/User';

export let userData: User

const routes: Routes =[
  {path : '', component : WelcomeComponent},
  {path : 'home', component : HomeComponent, canActivate:[LoginSuccessGuard]},
  {path : 'about', component : AboutComponent, canActivate:[LoginSuccessGuard]},
  {path : 'projects', component : ProjectsContainerComponent, canActivate:[LoginSuccessGuard]},
  {path : 'profile', component : ProfileUserComponent, canActivate:[LoginSuccessGuard], resolve: { DataResolveServiceResolver: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot)=> userData }},
  
  {path: '**', component: ErrorPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }