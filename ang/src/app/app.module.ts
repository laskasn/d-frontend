import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ClarityModule } from 'clarity-angular';

import { AppComponent } from './app.component';
import { AppService } from './app.service';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { GlobalInterceptor } from './services/interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AdminComponent } from './nav-components/admin/admin.component';
import { UserComponent } from './nav-components/user/user.component';

import { GoogleSigninComponent } from './security/external/google-signin.component';
import { GoogleSignoutComponent } from './security/external/google-signout.component';

import { CountriesComponent } from './db-components/countries/countries.component';
import { VesselRoutesComponent } from './db-components/vesselroutes/vesselroutes.component';


import { RestBase } from './services/rest-base';
import { CountryService } from './services/country.service';
import { VesselService } from './services/vessel.service';
import { PortService } from './services/port.service';
import { VisitsService } from './services/visits.service';
import { LoginService } from './services/login/login.service';
import { SessionService } from './services/login/session.service';
import { LoginGuardService } from './services/login/login-guard.service';

import {LocalStorageService} from 'ngx-webstorage';

import { ImagePreviewComponent } from './tools/image-preview/image-preview.component';
import { VesselsComponent } from './db-components/vessels/vessels.component';
import { PortsComponent } from './db-components/ports/ports.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './security/login/login.component';
import { NotificationComponent } from './tools/notification/notification.component';
import { UsersComponent } from './db-components/users/users.component';

const appRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [LoginGuardService],
    children: [
      {path: 'countries', component: CountriesComponent, canActivate: [LoginGuardService]},
      {path: 'vessels', component: VesselsComponent, canActivate: [LoginGuardService]},
      {path: 'ports', component: PortsComponent, canActivate: [LoginGuardService]}
    ]
  },
  { path: 'user',
    component: UserComponent,
    canActivate: [LoginGuardService],
    children: [
      {path: 'vesselroutes/:vesselID', component: VesselRoutesComponent, canActivate: [LoginGuardService]}
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: AppComponent
  }
  /*{
    path: 'heroes',
    component: HeroListComponent,
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
  */
];



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    CountriesComponent,
    ImagePreviewComponent,
    VesselsComponent,
    VesselRoutesComponent,
    PortsComponent,
    VesselRoutesComponent,
    GoogleSigninComponent,
    GoogleSignoutComponent,
    LoginComponent,
    NotificationComponent,
    UsersComponent
  ],
  imports: [
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterModule.forRoot(
      appRoutes
      //,{ enableTracing: true } // <-- debugging purposes only
    ),
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyATzGHCCgETVyMb9FkMuBXWkPQINB1Iepg'
    }),
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule
  ],
  providers: [
    LocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true,
    },
    AppService,
    CountryService,
    VesselService,
    PortService,
    VisitsService,
    LoginService,
    LoginGuardService,
    SessionService,
    RestBase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
