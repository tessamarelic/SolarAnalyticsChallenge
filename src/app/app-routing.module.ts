import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './features/countries/home/home.component';
import {CountryDetailsComponent} from './features/countries/country-details/country-details.component';
import {CountriesResolver} from './features/countries/countries.resolver';
import {CountryResolver} from './services/country.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      countries: CountryResolver
    }
  },
  {
    path: 'country-details/:id',
    component: CountryDetailsComponent,
    resolve: {
      countries: CountryResolver
    }
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [CountriesResolver]
})
export class AppRoutingModule { }
