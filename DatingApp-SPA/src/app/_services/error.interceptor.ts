import { AlertifyService } from './alertify.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
  HttpResponse
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(public alertify: AlertifyService) {}

  intercept(
    req: import('@angular/common/http').HttpRequest<any>,
    next: import('@angular/common/http').HttpHandler
  ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
    return next.handle(req).pipe(
      // tap(event => {
      //   if (event instanceof HttpResponse) {
      //     console.log(event);
      //   }
      // }),
      catchError(error => {
        if (error.status === 401) {
          return this.handleError(error.statusText);
        }
        if (error instanceof HttpErrorResponse) {
          const applicationError = error.headers.get('Application-Error');
          if (applicationError) {
            return this.handleError(applicationError);
          }
          const serverError = error.error;
          let modalStateErrors = '';
          if (serverError.errors && typeof serverError.errors === 'object') {
            for (const key in serverError.errors) {
              if (serverError.errors[key]) {
                modalStateErrors += serverError.errors[key] + '\n';
              }
            }
          }
          return this.handleError(
            modalStateErrors || serverError || 'Server Error'
          );
        }
      })
    );
  }

  private handleError(errorMsg: string): Observable<never> {
    // this.alertify.error(errorMsg);
    return throwError(errorMsg);
  }
}

export const ErrorIntercepterProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
