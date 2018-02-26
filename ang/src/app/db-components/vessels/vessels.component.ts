import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { VesselService } from '../../services/vessel.service';

import {ClrDatagridStringFilterInterface} from "@clr/angular";

class NameFilter implements ClrDatagridStringFilterInterface<any> {
    accepts(row: any, search: string) : boolean {
        return "" + row.name == search || row.name.toLowerCase().indexOf(search) >= 0;
    }
}
class CountryFilter implements ClrDatagridStringFilterInterface<any> {
    accepts(row: any, search: string) : boolean {
        return "" + row.country.name == search || row.country.name.toLowerCase().indexOf(search) >= 0;
    }
}

@Component({
  selector: 'vessels',
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.css']
})
export class VesselsComponent implements OnInit {

  private nameFilter = new NameFilter();
  private countryFilter = new CountryFilter();

  @ViewChild("fileInput") fileInput;

  vessels : any;
  countries : any;

  public showNewVesselImageModal : boolean = false;
  public showNewVesselModal: boolean = false;
  public showConfirmDelete : boolean = false;

  private lastClickedVessel : any;


  constructor(private vesselService : VesselService, private countryService : CountryService) {

  }

  ngOnInit() {
    this.getVessels();
    this.getCountries();
  }



newVessel(name:string, countryid: string){
  this.vesselService.createNewVessel(name, countryid).subscribe(
    data => {
      this.showNewVesselModal = false;
      this.getVessels();
    },
    error => {
      this.showNewVesselModal = false;
      this.getVessels();
    }
  )
}

getCountries() {
  this.countryService.getCountries().subscribe(
    data => {
      this.countries = data;
    },
    error => {
      console.log("Something went wrong");
    }
  )
}



  getVessels() {
    this.vesselService.getVessels().subscribe(
      data => {
        this.vessels = data;
      },
      error => {
        console.log("Something went wrong");
      }
    )
  }



uploadImageOf(vessel){
  console.log("Uploading image for vessel "+vessel.id);
  this.showNewVesselImageModal = true;
  this.lastClickedVessel = vessel;
}


saveVesselImage(imageFileElem){

  console.log(imageFileElem.files[0]);

  let f : File = imageFileElem.files[0];

  let data : FormData = new FormData();

  data.append('id', this.lastClickedVessel.id);
  data.append('name', this.lastClickedVessel.name);
  data.append('countryid', this.lastClickedVessel.country.id)
  data.append('image', f, f.name);

  this.vesselService.saveVesselImage(data).subscribe(
      data => {
          console.log("Subscribe data", data);
          this.getVessels();
      },
      (err) => {
          this.getVessels();
          //console.log(err.message, JSON.parse(err.error).error.message);
      }
  )
  ;//.add(() => this.uploadBtn.nativeElement.disabled = false);//teardown

  this.showNewVesselImageModal = false;
}

deleteVessel(vessel: any){
  let id = vessel;
  if(vessel.id!=null)
    id=vessel.id;
  this.vesselService.deleteVessel(id).subscribe(
    data => {
        console.log("Subscribe data", data);
        this.getVessels();
    },
    (err) => {
        this.getVessels();
        //console.log(err.message, JSON.parse(err.error).error.message);
    }
  );
}




}
