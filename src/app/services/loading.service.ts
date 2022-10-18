import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {


  show (): void{ this.isLoading$.next(true) }
  hide (): void{ this.isLoading$.next(false) }

  isLoading$ = new Subject<boolean>();
}
