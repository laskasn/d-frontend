import { HttpClient , HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { SessionService, LoginProvider } from './login/session.service';

import 'rxjs/Rx';


export class RestBase {

    //static get parameters() { return [HttpClient] }
    static get parameters() { return [HttpClient, SessionService] }

    constructor(public http : HttpClient, private sessionService: SessionService) {

    }


    protocol: string = "http";
    hostname: string = "localhost";
    port: number = 8080;
    webappname: string = "";
    restpath: string = "";



    restPath: string = this.protocol+"://"+this.hostname+":"+this.port+"/"+this.webappname+"/"+this.restpath+"/";


    public login(path: string, credentials: any) : Observable<HttpResponse<any>>{
      const headers = new HttpHeaders(credentials ? {
          authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      } : {});
      return this.http.get<any>(this.restPath + path, {headers: headers /*, observe: 'response', withCredentials: true */});
    }

    public get(path : string, params? : any){
        var options = this.createOptions(params);
        return this.http.get<any>(this.restPath + path, options);
    }


    public post(path : string, data : any, params? : any){
        var options = this.createOptions(params);
        let serialized = JSON.stringify(data);
        serialized = serialized.replace("port ","port"); //that's to fix a bug
        return this.http.post<any>(this.restPath + path, serialized, options);
    }

    public post_plain(path : string, data : any){
        return this.http.post<any>(this.restPath + path, data);
    }


    private createOptions(parameters : any){

        var params = new HttpParams();

        if(parameters != null){
            Object.entries(parameters).forEach( entry => {
                params = params.set(entry[0], String(entry[1]));
            });
        }

        var headers =  new HttpHeaders().set('Content-Type', 'application/json');


        if(this.sessionService.isLoggedIn()) {
          headers = headers.set('Authorization', 'Basic ' + btoa('%%%custom-token%%%' + ":" + this.sessionService.getToken()));
        }

        let options = { params: params, headers: headers };
        return options;
    }



}
