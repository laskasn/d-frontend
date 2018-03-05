import {Component, ElementRef, AfterViewInit} from '@angular/core';
import {SessionService} from '../../services/login/session.service';
import { LoginProvider } from '../../services/login/session.service';
import { LoginService } from '../../services/login/login.service';
import {Router} from '@angular/router';


declare const gapi: any;

@Component({
  selector: 'google-signin',
  //templateUrl: './google-signin.component.html',
  styles: [
    'img:hover {cursor: pointer; transform: scale(1.1);}'
  ],
  template:'<img style="width: 50px;" src="https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png" alt="Google"><notification [type]="notification.type" [text]="notification.text" [visible]="notification.visible"></notification>'
})
export class GoogleSigninComponent implements AfterViewInit {

  private clientId:string = '536713408045-clb2dpnvl55t0qvtshman8ssku07eh7v.apps.googleusercontent.com';

  private scope = [
    'profile'
    ,'email'
  ].join(' ');

  private notification = {
      visible : false,
      text : '',
      type : ''
  }


  public auth2: any;

  constructor(private element: ElementRef, private sessionService: SessionService, private loginService: LoginService, private router:Router) {
    console.log('ElementRef: ', this.element);
  }


  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      debugger;
      that.attachSignin(that.element.nativeElement.firstChild);
    });
  }


  public attachSignin(element) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
debugger;
        let profile = googleUser.getBasicProfile();
        /*
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        console.log('Basic ' + btoa('external-google-provider:' + googleUser.getAuthResponse().id_token));
        */



        let credentials = {
          username: '%%%external-google-provider%%%',
          password: googleUser.getAuthResponse().id_token
        }



        this.loginService.authenticate(credentials).subscribe(
          response => {
            debugger;
            this.showNotification("Logged in (social) successfully", "success", 3000 )! //this actually has no effect since we navigate away
            this.sessionService.login(response['token'], LoginProvider.google, response['username'], response['roles']);
            console.log("logged in (through google) with token: "+this.sessionService.getToken()+" and roles: "+this.sessionService.getRoles());
            this.router.navigate(['/']);
            location.reload();
          },
          error => {
            debugger;
            this.showNotification("There was an error signing in with google!", "danger", 3000 );
          }

        );

        //window.location.reload();

      }, (error) => {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }




  ngAfterViewInit() {
      let intervalID = setInterval( ()=> {
          if(typeof gapi == "undefined") {
            //console.log("is_undefined!!")
          }
          else{
            clearInterval(intervalID);
            this.googleInit();
          }
        },1
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
