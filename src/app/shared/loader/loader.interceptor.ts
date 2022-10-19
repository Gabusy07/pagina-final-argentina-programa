import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private readonly loadingSVC: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingSVC.show();
    return next.handle(request)
    .pipe(finalize( () => this.loadingSVC.hide()));
  }
}
