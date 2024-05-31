import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const apiKey = 'your_api_key_here';
    const authReq = req.clone({
      setHeaders: {
        ApiKey: apiKey,
      },
    });
    return next.handle(authReq);
  }
}
