import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {RestBase} from './rest-base';


@Injectable()
export class UserService {

  constructor(public restBase: RestBase) { }

  public getUsers(){
    return this.restBase.get("users/list");
  }


}
