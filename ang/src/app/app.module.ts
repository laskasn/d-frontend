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
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AdminComponent } from './nav-components/admin/admin.component';
import { UserComponent } from './nav-components/user/user.component';


import { CountriesComponent } from './db-components/countries/countries.component';
import { VesselRoutesComponent } from './db-components/vesselroutes/vesselroutes.component';

import { RestBase } from './services/rest-base';
import { CountryService } from './services/country.service';
import { VesselService } from './services/vessel.service';
import { PortService } from './services/port.service';
import { VisitsService } from './services/visits.service';

import { ImagePreviewComponent } from './tools/image-preview/image-preview.component';
import { VesselsComponent } from './db-components/vessels/vessels.component';
import { PortsComponent } from './db-components/ports/ports.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AgmCoreModule } from '@agm/core';

const appRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {path: 'countries', component: CountriesComponent},
      {path: 'vessels', component: VesselsComponent},
      {path: 'ports', component: PortsComponent}
    ]
  },
  { path: 'user',
    component: UserComponent,
    children: [
      {path: 'vesselroutes/:vesselID', component: VesselRoutesComponent}
    ]
  },
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
    VesselRoutesComponent
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
  providers: [AppService, CountryService, VesselService, PortService, VisitsService, RestBase],
  bootstrap: [AppComponent]
})
export class AppModule { }
