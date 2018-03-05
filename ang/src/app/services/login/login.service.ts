import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RestBase } from '../rest-base';
import { SessionService, LoginProvider } from './session.service';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';



@Injectable()
export class LoginService {


  constructor(private restBase : RestBase , private sessionService: SessionService, private router : Router) {

  }



  authenticate(credentials, loginProvider: LoginProvider) {

    this.restBase.login('app/login', credentials).subscribe(
      response => {
        debugger;
        this.router.navigate(['/']);
        this.sessionService.login(response['token'], loginProvider, response['username'], response['roles']);
        console.log("logged in with token: "+this.sessionService.getToken()+" and roles: "+this.sessionService.getRoles());

      },
      error => {
        debugger;
      }

    );

  }


}
