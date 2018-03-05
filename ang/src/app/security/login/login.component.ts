import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { LoginProvider, SessionService } from '../../services/login/session.service';
import {Router} from '@angular/router';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginData = {username: "", password: ""};


  constructor(private loginService: LoginService, private sessionService : SessionService, private router: Router) {
  }


  ngOnInit() {
/*
    if(this.sessionService.isLoggedIn()){
      this.router.navigate(['/']);
    }
*/
  }


  ngAfterViewInit(){
    debugger;
    if(this.sessionService.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  nativeLogin() {
    this.loginService.authenticate(this.loginData, LoginProvider.native );
  }




}
