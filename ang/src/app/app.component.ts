import { Component, OnInit } from '@angular/core';
import {SessionService} from './services/login/session.service';
import { AppService } from './app.service';
import { RestBase } from './services/rest-base';
import {Router} from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-root',
  providers: [AppService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

    highlights: any = {
      "user":false,
      "admin":false
    }

    title = 'app';
    date : any;
    logoImage : any = null;

    constructor(private appService : AppService, private sessionService : SessionService, private restBase : RestBase, private router:Router) {
    }

    ngOnInit() {
      console.log("initializing...");
      if(!this.sessionService.isLoggedIn())
        this.router.navigate(['/login']);
    }


    highlight(elemName){
      for (let h in this.highlights) {
         this.highlights[h] = false;
      }
      this.highlights[elemName] = true;
    }

    signout(){


      this.signoutGoogle();

      this.restBase.get('app/logout').subscribe(
        response => {
          this.signoutGoogle();
          this.sessionService.logout();
          this.router.navigate(['/login']);
        },
        error => {
          //even in a case of error, we should logout UI side, and ask for a new loggging in
          this.sessionService.logout();
          this.router.navigate(['/login']);
        }

      );
    }


    signoutGoogle(){

      if(gapi.auth2==null) return;

      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out from google');

      });
    }



}
