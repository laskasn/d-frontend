import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import { RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import {RestBase} from './rest-base';

import 'rxjs/add/operator/map';


@Injectable()
export class CountryService {

  constructor(public restBase: RestBase, private http : HttpClient) { }




  public getCountries(){
    return this.restBase.get("country/list");
  }

  public editCountry(country : any){
    return this.restBase.post("country/update", country);
  }


  public createNewCountry(name: string){
    return this.restBase.post("country/add", {"name":name});
  }

  deleteCountry(id : string){
    return this.restBase.post("country/delete", {"id":id});
  }

  saveCountryFlag(formData : FormData) {
      return this.restBase.post_plain('country/update', formData);
  }



}
