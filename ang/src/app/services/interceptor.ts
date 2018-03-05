import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { SessionService } from './login/session.service';
import {Router} from '@angular/router';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

    constructor(private router : Router, private sessionService : SessionService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      /*
      const xhr = req.clone({
        headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
      });
*/
/*
      if(this.sessionService.isLoggedIn()){
        req = req.clone({ headers: req.headers.set('X-Auth-Token', this.sessionService.getToken()) });
      }
*/
      return next.handle(req  /*xhr*/).do((event: HttpEvent<any>) => {
        /*
        if (event instanceof HttpResponse) {
          console.log("response ok");
        }
        */
      }, (err: any) => {

        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {

            debugger;
            console.log("Received an unauthorized... redirecting to login page");
            this.sessionService.logout();
            this.router.navigate(['/login'], { queryParams: {
              //returnUrl: this.state.url
            }});
            
          }
        }

      });


    //return next.handle(req);
  }
}
