import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Project } from 'app/model/Project';
import { Observable, of } from 'rxjs';
import { ProjectsService } from '../http/projects.service';

@Injectable({
  providedIn: 'root'
})
export class DataProjectsResolver implements Resolve<Project[]> {
  constructor(private readonly _projectSvc:ProjectsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project[]> {
    return this._projectSvc.getAllProjects();
  }
}
