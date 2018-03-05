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

  private notification = {
      visible : false,
      text : '',
      type : ''
  }

  constructor(private loginService: LoginService, private sessionService : SessionService, private router: Router) {
  }

  ngOnInit() {

  }


  ngAfterViewInit() {
    if(this.sessionService.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  nativeLogin() {
    this.loginService.authenticate(this.loginData ).subscribe(
      response => {
        this.showNotification("Logged in successfully", "success", 3000 )! //this actually has no effect since we navigate away
        debugger;
        this.router.navigate(['/']);
        this.sessionService.login(response['token'], LoginProvider.native, response['username'], response['roles']);
        console.log("logged in with token: "+this.sessionService.getToken()+" and roles: "+this.sessionService.getRoles());
      },
      error => {
        debugger;
        if(error.status==401)
          this.showNotification("Wrong username or password, please retry!", "danger", 3000 );
        else
          this.showNotification("An internal server error occured!", "danger", 3000 );
      }

    );
  }

  showNotification(text:string, type:string, forMillis: number){
    this.notification.text=text;
    this.notification.type=type;
    this.notification.visible=true;
    setTimeout( ()=> { this.hideNotification(); }, forMillis);
  }
  hideNotification(){
    this.notification.text='';
    this.notification.type='';
    this.notification.visible=false;
  }


}
