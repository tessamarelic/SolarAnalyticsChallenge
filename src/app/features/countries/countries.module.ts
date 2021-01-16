import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home/home.component';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {CountriesService} from '../../services/countries.service';
import {CountryDetailsComponent} from './country-details/country-details.component';
import {RouterModule} from '@angular/router';
import {CountryDetailsRoutingModule} from './country-details/country-details-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    CountryDetailsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    RouterModule,
    CountryDetailsRoutingModule
  ],
  exports: [
    HomeComponent,
    CountryDetailsComponent,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [
    CountriesService
  ]
})
export class CountriesModule { }
