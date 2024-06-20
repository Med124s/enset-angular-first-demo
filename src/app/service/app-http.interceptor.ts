import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import {Injectable} from "@angular/core";
import {catchError, finalize, Observable, throwError} from "rxjs";
import {AppStateService} from "./app-state.service";
import {LoadingService} from "./loading.service";

// export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
//   let request = req.clone();
//   request.headers.set("Authorization","Bearer JWT");
//   return next(request);
// };
@Injectable()
export class appHttpInterceptor implements HttpInterceptor {

  constructor(public appState:AppStateService,
              public laoding:LoadingService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.laoding.showLoadingSpinner();
    //this.appState.setProductState({statusProd:"LOADING"});

    console.log('Request URL: ' + req.url);
    let request = req.clone({
      headers:req.headers.set("Authorization","Bearer JWT")
    });
    return next.handle(request).pipe(
    catchError((error: HttpErrorResponse) => {
        console.error('Logging Interceptor DI Error:', error);
        //this.appState.setProductState({statusProd:"ERROR",errMessage:error.message})
        return throwError(()=> error);
      }),
      finalize(()=>{
        this.laoding.hideLoadingSpinner();

      })

    );
  }
}
