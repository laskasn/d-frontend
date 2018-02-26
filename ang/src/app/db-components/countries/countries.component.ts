import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { CountryService } from '../../services/country.service';

import {ClrDatagridStringFilterInterface} from "@clr/angular";

class NameFilter implements ClrDatagridStringFilterInterface<any> {
    accepts(row: any, search: string) : boolean {
        return "" + row.name == search || row.name.toLowerCase().indexOf(search) >= 0;
    }
}


@Component({
  selector: 'countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  private nameFilter = new NameFilter();

  @ViewChild("fileInput") fileInput;

  private countries : any;

  public showNewCountryIconModal : boolean = false;
  public showNewCountryModal: boolean = false;
  public showConfirmDelete: boolean = false;


  private lastClickedCountry : any;


  constructor(private countryService : CountryService) {

  }

  ngOnInit() {
    this.getCountries();
  }



newCountry(name:string){
  this.countryService.createNewCountry(name).subscribe(
    data => {
      this.showNewCountryModal = false;
      this.getCountries();
    },
    error => {
      this.showNewCountryModal = false;
      this.getCountries();
    }
  )
};




  getCountries() {
    this.countryService.getCountries().subscribe(
      data => {
        this.countries = data;
      },
      error => {
        console.log("Something went wrong");
      }
    )
  };



uploadIconOf(country){
  console.log("Uploading icon for country "+country.id);
  this.showNewCountryIconModal = true;
  this.lastClickedCountry = country;

}


saveCountryFlag(iconFileElem){
  console.log(iconFileElem.files[0]);

  let f : File = iconFileElem.files[0];

  let data : FormData = new FormData();

  data.append('id', this.lastClickedCountry.id);
  data.append('name', this.lastClickedCountry.name);
  data.append('icon', f, f.name);

  this.countryService.saveCountryFlag(data).subscribe(
      data => {
          console.log("Subscribe data", data);
          this.getCountries();
      },
      (err) => {
          this.getCountries();
          //console.log(err.message, JSON.parse(err.error).error.message);
      }
  )
  ;//.add(() => this.uploadBtn.nativeElement.disabled = false);//teardown


  this.showNewCountryIconModal = false;
}

deleteCountry(id: string){
  this.countryService.deleteCountry(id).subscribe(
    data => {
        console.log("Subscribe data", data);
        this.getCountries();
    },
    (err) => {
        this.getCountries();
        //console.log(err.message, JSON.parse(err.error).error.message);
    }
  );
}




}
