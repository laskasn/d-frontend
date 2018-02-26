import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  currentTab : any = null;

  ngOnInit() {
    this.initTabs();
  }

  initTabs(){
    this.currentTab = {
      "countries" : false,
      "vessels" : false,
      "ports" : false
    }
  }

  highlight(which){
    this.initTabs();
    this.currentTab[which] = true;
  }

}
