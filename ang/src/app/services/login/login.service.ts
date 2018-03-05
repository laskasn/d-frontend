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



  authenticate(credentials) {

    return this.restBase.login('app/login', credentials);

  }


}
