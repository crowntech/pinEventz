import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userService: UserService, private router: Router) {}

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
                const idToken = localStorage.getItem('id_token');
                if (idToken) {
                  const cloned = req.clone({
                      headers: req.headers.set('Authorization', 'Bearer ' + idToken),
                  });
                  // console.log(cloned);
                  return next.handle(cloned);

              } else {
                console.log(req);
                return next.handle(req);

              }
          }


}
