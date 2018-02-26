import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {RestBase} from './rest-base';

import 'rxjs/add/operator/map';


@Injectable()
export class PortService {

  constructor(public restBase: RestBase) { }



  public getPorts(){
    return this.restBase.get("port/list");
  }

  public editPort(port : any){
    return this.restBase.post("port/update", port);
  }


  public createPort(name: string, longitude: any, latitude: any){
    return this.restBase.post("port/add", {"name":name, "longitude": longitude, "latitude":latitude});
  }

  public deletePort(id : string){
    return this.restBase.post("port/delete", {"id":id});
  }




}
