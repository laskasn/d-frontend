import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import { DOCUMENT } from '@angular/platform-browser';


declare var jQuery : any;

import '../../../assets/custom.js';
declare function sign_out_google(): any;
/*
*/

@Injectable()
export class SessionService {

  constructor(private storage : LocalStorageService, @Inject(DOCUMENT) private document, private router : Router) {
    //var csrfToken : string = jQuery(document).find('meta[name="csrf-token"]').attr('content');
    //this.setCSRFToken(csrfToken);
  }

  /*
  getCSRFToken() : string{
  return this.storage.retrieve('csrf-token');
  }

  setCSRFToken(csrfToken : string){
  this.storage.store('csrf-token',csrfToken);
  }
  */

  getProvider() : LoginProvider {
    return this.storage.retrieve('provider');
  }

  setProvider(provider : LoginProvider){
    this.storage.store('provider', provider);
  }


  getToken() : string{
    return this.storage.retrieve('token');
  }

  setToken(token : string){
    this.storage.store('token', token);
  }


  getRoles() : string[] {
    return this.storage.retrieve('roles');
  }

  setRoles(roles : string[]){
    this.storage.store('roles', roles);
  }

  isLoggedIn(){
    return this.storage.retrieve('loggedIn');
  }

  setLoggedIn(boolStatus){
    this.storage.store('loggedIn',boolStatus);
  }

  getUsername(){
    return this.storage.retrieve('username');
  }

  setUsername(username){
    this.storage.store('username',username);
  }

  login(token: string, provider: LoginProvider, username: string, roles : string[]){
    this.setLoggedIn(true);
    this.setToken(token);
    this.setProvider(provider);
    this.setUsername(username);
    this.setRoles(roles);
  }

  logout(){
    debugger;
    console.log("logging out of app");

    this.setLoggedIn(false);
    this.setUsername(null);
    this.setToken(null);
    this.setRoles(null);


    //if(this.getProvider() == LoginProvider.google){
    //  sign_out_google();
    //}

    this.setProvider(null);

    //this.router.navigate(['/login'], { queryParams: {
      ////returnUrl: this.state.url
    //}});

    //window.location.reload();
  }


}

export enum LoginProvider {
  native,
  google
}
