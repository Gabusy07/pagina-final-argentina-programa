
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '@layout/about/about.component';
import { ProjectsContainerComponent } from '@layout/home/projects-container/projects-container.component';
import { WelcomeComponent } from '@layout/welcome/welcome.component';
import { ErrorPageComponent } from '@shared/error-page/error-page.component';
import { UserProfileComponent } from '@shared/user-profile/user-profile.component';
import { LoginSuccessGuard } from './guards/login-success.guard';
import { HomeComponent } from './layout/home/home.component';


const routes: Routes =[
  {path : '', component : WelcomeComponent},
  {path : 'home', component : HomeComponent, canActivate:[LoginSuccessGuard]},
  {path : 'about', component : AboutComponent},
  {path : 'projects', component : ProjectsContainerComponent},
  {path : 'user-profile', component : UserProfileComponent},
  {path: '**', component: ErrorPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }