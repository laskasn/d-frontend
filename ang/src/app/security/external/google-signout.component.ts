import {Component, ElementRef, AfterViewInit} from '@angular/core';
import {SessionService} from '../../services/login/session.service';

declare const gapi: any;

@Component({
  selector: 'google-signout',
  template: '<button (click)="signoutGoogle()">Google Sign-out</button>'
})
export class GoogleSignoutComponent implements AfterViewInit {

  public auth2: any;

  constructor(private element: ElementRef, private sessionService : SessionService) {
    console.log('ElementRef: ', this.element);
  }

  ngAfterViewInit() {

  }

  signoutGoogle(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out from google');
      this.sessionService.logout();
    });
  }


}
