import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { WelcomeComponent } from './layout/welcome/welcome.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { UserService } from "./services/http/User.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoginComponent } from './layout/welcome/login-form/login.component';
import { LoaderComponent } from './shared_/loader/loader.component';
import { LoaderInterceptor } from './shared_/loader/loader.interceptor';
import { ArrowComponent } from './shared_/arrow/arrow.component';
import { KnowledgesEditComponent } from './admin/knowledges-edit/knowledges-edit.component';
import { SkillsEditComponent } from './admin/skills-edit/skills-edit.component';
import { ProfileInfoComponent } from './layout/about/profile-info/profile-info.component';
import { ProfileInfoEditComponent } from './admin/profile-info-edit/profile-info-edit.component';
import { ProjectsEditComponent } from './admin/projects-edit/projects-edit.component';
import { FooterEditComponent } from './admin/footer-edit/footer-edit.component';
import { HomeEditComponent } from './admin/home-edit/home-edit.component';
import { AboutEditComponent } from './admin/about-edit/about-edit.component';
import { NoDataTemplateComponent } from './shared_/no-data-template/no-data-template.component';
import { ProfileUserComponent } from './shared_/profile-user/profile-user.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    WelcomeComponent,
    RegisterFormComponent,
    KnowledgesComponent,
    NavigationComponent,
    FooterComponent,
    AsideComponent,
    PorterComponent,
    SkillsComponent,
    ProjectsContainerComponent,
    LoginComponent,
    LoaderComponent,
    ArrowComponent,
    KnowledgesEditComponent,
    SkillsEditComponent,
    ProfileInfoComponent,
    ProfileInfoEditComponent,
    ProjectsEditComponent,
    FooterEditComponent,
    HomeEditComponent,
    AboutEditComponent,
    NoDataTemplateComponent,
    ProfileUserComponent,
 
  ],
  imports: [
    
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
  ],
  exports: [RouterModule],

  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy},
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

