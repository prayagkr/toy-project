import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from './cookie.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor  {

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.cookieService.getCookie('token') || null;
    let authReq: any;
    if (authToken) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', authToken)
      });
    } else {
      authReq = req;
    }
    // return next.handle(authReq);
    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // TBD //
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 403) {
        this.cookieService.clearCookie('token');
        this.router.navigateByUrl('/login');
      }
    }));
  }
}
