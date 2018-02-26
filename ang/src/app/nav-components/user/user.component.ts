import { Component, OnInit } from '@angular/core';
import { VesselService } from '../../services/vessel.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private vesselService : VesselService ) { }

  vesselNameIds : any;

  ngOnInit() {
    this.vesselService.getVesselNameIDs().subscribe(
      data => {
        this.vesselNameIds = data;
      },
      error => {
        console.log("There was an error while fetching info from the server: "+error);
      }
    );

  }

}
