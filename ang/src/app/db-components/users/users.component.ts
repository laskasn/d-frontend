import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';

import {ClrDatagridStringFilterInterface} from "@clr/angular";


class NameFilter implements ClrDatagridStringFilterInterface<any> {
    accepts(row: any, search: string) : boolean {
        return "" + row.name == search || row.name.toLowerCase().indexOf(search) >= 0;
    }
}

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private nameFilter = new NameFilter();

  users : any;


  public showNewPortModal: boolean = false;
  public showConfirmDelete : boolean = false;

  private portToDelete : any;


  constructor(private userService : UserService) {

  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log("Something went wrong");
      }
    )
  };



/*
  newPort(name:string, longitude: any, latitude: any){
    this.portService.createPort(name, longitude, latitude).subscribe(
      data => {
        this.showNewPortModal = false;
        this.getPorts();
      },
      error => {
        this.showNewPortModal = false;
        this.getPorts();
      }
    )
  };




  getPorts() {
    this.portService.getPorts().subscribe(
      data => {
        this.ports = data;
      },
      error => {
        console.log("Something went wrong");
      }
    )
  };



deletePort(id: string){
  this.portService.deletePort(id).subscribe(
    data => {
        this.getPorts();
    },
    (err) => {
        this.getPorts();
        //console.log(err.message, JSON.parse(err.error).error.message);
    }
  );
}

showNewPortModalFunc(){
  this.showNewPortModal = true;
  this.agm.triggerResize();
}

mapClicked(event){
  this.map.marker = {
    "long":event.coords.lng,
    "lat":event.coords.lat,
    "draggable":false,
    "label":""
  }
}

markerDragEnd(marker, event){

}


confirmDelete(){


}
*/


}
