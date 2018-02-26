import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import { RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import {RestBase} from './rest-base';

import 'rxjs/add/operator/map';


@Injectable()
export class VisitsService {

  constructor(public restBase: RestBase, private http : HttpClient) { }




  public getVisits(vesselID: string){
    return this.restBase.get("visit/list", {"vesselID":vesselID});
  }


  public addVisit(vesselID: string, portID: string, visittime: any){
    return this.restBase.post("visit/add", {"vessel":{"id":vesselID}, "port ":{"id":portID},"visittime":visittime});
  }


  public deleteVisit(id : string){
    return this.restBase.post("visit/delete", {"id":id});
  }



}
