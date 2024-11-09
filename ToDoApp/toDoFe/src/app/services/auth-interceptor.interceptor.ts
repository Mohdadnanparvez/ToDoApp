import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './loginService';


@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authReq = request;

    const jwtToken = this.loginService.getToken();
    if (jwtToken != null) {
      authReq = authReq.clone({
        setHeaders: { 'Authorization': `Bearer${jwtToken}` },
      });
    }

    return next.handle(authReq);
  }
}
