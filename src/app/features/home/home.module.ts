import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {CountriesService} from '../../services/countries.service';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    CountriesService
  ]
})
export class HomeModule { }
