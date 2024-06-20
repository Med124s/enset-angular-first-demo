import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loading$ = new Subject<boolean>();
  constructor() { }

  showLoadingSpinner(){
    this.loading$.next(true);
  }
  hideLoadingSpinner(){
    this.loading$.next(false);
  }
}
