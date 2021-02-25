import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import {SharedModule} from '../../shared/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {CountryProviderService} from '../../services/country-provider.service';
import { StoreModule } from '@ngrx/store';
import * as fromCountries from './reducers/country.reducers';
import {CountriesResolver} from './countries.resolver';
import {countryReducer} from './reducers/country.reducers';

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
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    RouterModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    StoreModule.forFeature(fromCountries.countriesFeatureKey, countryReducer)
  ],
  exports: [
    HomeComponent,
    CountryDetailsComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    CountriesService,
    CountryProviderService,
    CountriesResolver]
})
export class CountriesModule { }
