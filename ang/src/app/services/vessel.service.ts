import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import { RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import {RestBase} from './rest-base';

import 'rxjs/add/operator/map';


@Injectable()
export class VesselService {

  constructor(public restBase: RestBase, private http : HttpClient) { }


  public getVessels(){
    return this.restBase.get("vessel/list");
  }

  public getVesselNameIDs(){
    return this.restBase.get("vessel/listidname");
  }

  public editVessel(vessel : any){
    return this.restBase.post("vessel/update", vessel);
  }


  public createNewVessel(name: string, countryid: string){
    return this.restBase.post("vessel/add", {"name":name, "country": {"id":countryid} });
  }

  public deleteVessel(id : string){
    return this.restBase.post("vessel/delete", {"id":id});
  }


  saveVesselImage(formData : FormData) {
    return this.restBase.post_plain('vessel/update', formData);
  }



}
