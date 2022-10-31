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
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AsideComponent } from './layout/home/aside/aside.component';
import { AboutComponent } from '@layout/about/about.component';
import { PorterComponent } from './layout/home/porter/porter.component';
import { SkillsComponent } from '@layout/about/skills/skills.component';
import { ProjectsContainerComponent } from '@layout/home/projects-container/projects-container.component';
import { RegisterFormComponent } from 'app/auth/register-form/register-form.component';
import { UserService } from "./services/http/User.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoginComponent } from './auth/login-form/login.component';
import { LoaderComponent } from './shared_/loader/loader.component';
import { LoaderInterceptor } from './shared_/loader/loader.interceptor';
import { ArrowComponent } from './shared_/arrow/arrow.component';
import { KnowledgesEditComponent } from './layout/admin/knowledges-edit/knowledges-edit.component';
import { SkillsEditComponent } from './layout/admin/skills-edit/skills-edit.component';
import { ProfileInfoComponent } from './layout/about/profile-info/profile-info.component';
import { ProfileInfoEditComponent } from './layout/admin/profile-info-edit/profile-info-edit.component';
import { ProjectsEditComponent } from './layout/admin/projects-edit/projects-edit.component';
import { FooterEditComponent } from './layout/admin/footer-edit/footer-edit.component';
import { HomeEditComponent } from './layout/admin/home-edit/home-edit.component';
import { AboutEditComponent } from './layout/admin/about-edit/about-edit.component';
import { NoDataTemplateComponent } from './shared_/no-data-template/no-data-template.component';
import { ProfileUserComponent } from './shared_/profile-user/profile-user.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'environments/environment.prod';



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
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ToastrModule.forRoot({
      timeOut:2000,
      preventDuplicates: true,
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  exports: [RouterModule],

  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy},
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
    
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

