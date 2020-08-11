import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UtilService } from './../service/util.service';

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService {
  constructor(
    private util: UtilService,
    private alert: AlertService
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.util.getToken();
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:`${currentUser}`
        }
      });
    }
    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401 || err.status == 400) {
          this.alert.danger(err.error.message || 'session expired, please login again');
          this.util.logout();
        }
        this.alert.danger(err.error.message || 'Network failure, pls check your internet connection');
          return;
      }
    }));
  }
}