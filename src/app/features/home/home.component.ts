import { Component, OnInit } from '@angular/core';
import {CountriesService} from '../../services/countries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.getCountriesData();
  }

  getCountriesData(): void {
    this.countriesService.getCountries().subscribe(countries => {
      console.log(countries);
    }, error => {
      console.error(error);
    });
  }

}
