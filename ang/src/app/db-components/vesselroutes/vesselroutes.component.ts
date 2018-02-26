import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PortService } from '../../services/port.service';
import { VisitsService } from '../../services/visits.service';

import {ClrDatagridStringFilterInterface} from "@clr/angular";

class PortNameFilter implements ClrDatagridStringFilterInterface<any> {
    accepts(row: any, search: string) : boolean {
        return "" + row.port.name == search || row.port.name.toLowerCase().indexOf(search) >= 0;
    }
}

import {ClrDatagridComparatorInterface} from "@clr/angular";

class DateComparator implements ClrDatagridComparatorInterface<any> {
    compare(a: any, b: any) {
        return a.visittime - b.visittime;
    }
}

@Component({
  selector: 'vesselroutes',
  templateUrl: './vesselroutes.component.html',
  styleUrls: ['./vesselroutes.component.css']
})
export class VesselRoutesComponent implements OnInit {

  private nameFilter = new PortNameFilter();
  private dateSorter = new DateComparator();

  private vesselID : any = null;
  private ports : any= null;
  private routes : any = null;

  private showNewVisitModal : boolean = false;

  public showConfirmDelete: boolean = false;
  private lastClickedVisit: any;

  map : any = {
    markers: [],
    long: 10,
    lat: 10,
    zoom: 3
  }

  constructor(private route: ActivatedRoute, private visitsService: VisitsService, private portService : PortService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.vesselID = params['vesselID'];
       this.loadPorts();
       this.loadRoutes();
    });
  }


  loadPorts(){
    this.portService.getPorts().subscribe(
      data => {
        this.ports = data;
      },
      error => {
        console.log("Could not retrieve list of ports");
      }
    )
  }


  fixDatePopup(){
    var refreshIntervalId = setInterval(function() {
      let el : any = document.getElementsByClassName("cdk-overlay-container")[0];
      el.style.zIndex = 2000;
      if(el!=null)
        clearInterval(refreshIntervalId);
    }, 1);
  }


  loadRoutes(){

    this.visitsService.getVisits(this.vesselID).subscribe(
      data => {
        this.routes = data;
        this.computeMapPins();
      },
      error => {
        console.log("Failed to load routes");
      }
    )
  }

  computeMapPins(){

    this.map.markers = [];

    for(var route of this.routes){

      let marker = {
        "label":route.port.name,
        "lat":route.port.latitude,
        "long":route.port.longitude,
        "draggable":false,
        "date":route.visittime
      }

      this.map.markers.push(marker);
    }

  }

  newVisit(portID, timeofvisit){
    let date : Date = timeofvisit._selected;
    let timeofvisitmillis = date.getTime();

    this.visitsService.addVisit(this.vesselID, portID, timeofvisitmillis).subscribe(
      data => {
        this.showNewVisitModal=false;
        this.loadRoutes();
      },
      error => {
        this.showNewVisitModal=false;
        this.loadRoutes();
      }
    );
  }


  deleteVisit(visitID){
    this.visitsService.deleteVisit(visitID).subscribe(
      data => {
        this.loadRoutes();
      },
      error => {
        this.loadRoutes();
      }
    );
  }

  clickedMarker(marker, i){

  }

  mapClicked(event){

  }

  highlightVisit(route){

    this.map.lat = route.port.latitude;
    this.map.long = route.port.longitude;
    this.map.zoom = 7;

  }

}
