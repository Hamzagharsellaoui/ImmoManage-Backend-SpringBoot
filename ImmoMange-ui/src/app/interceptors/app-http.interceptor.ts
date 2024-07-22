import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../services/services/auth-service.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!request.url.includes("/user/login")) {
      let newRequest=request.clone({headers: request.headers.set('Authorization', 'bearer '+this.authService.accessToken)});
      return next.handle(newRequest).pipe(
        catchError(err => {
          if(err.status==401) {
            this.authService.logout();
          }
          return throwError(err.message);
        })
      );
    }
    else {
      return next.handle(request);
    }
  }
}
