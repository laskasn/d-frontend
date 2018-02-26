import { Component, OnInit } from '@angular/core';

import { AppService } from './app.service';

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

    constructor(private appService : AppService) {
    }

    ngOnInit() {
      console.log("initializing...");
    }


    highlight(elemName){
      for (let h in this.highlights) {
         this.highlights[h] = false;
      }
      this.highlights[elemName] = true;
    }




}
