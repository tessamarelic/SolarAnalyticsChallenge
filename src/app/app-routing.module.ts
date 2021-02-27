import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './features/countries/home/home.component';
import {CountryDetailsComponent} from './features/countries/country-details/country-details.component';
import {CountriesResolver} from './features/countries/countries.resolver';

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
      countries: CountriesResolver
    }
  },
  {
    path: 'country-details/:id',
    component: CountryDetailsComponent,
    resolve: {
      countries: CountriesResolver
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
