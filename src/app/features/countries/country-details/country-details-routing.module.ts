import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {CountryDetailsComponent} from './country-details.component';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: CountryDetailsComponent
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
    ],
  exports: [RouterModule]
})
export class CountryDetailsRoutingModule{ }
