import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Country} from '../../../models/country.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CountriesService} from '../../../services/countries.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit, OnDestroy {
  countryToDisplay = new Country();
  countrySubscription = new Subscription();
  selectedCountryCode = '';
  listOfCodes = Array<string>();
  listOfCountries = Array<Country>();
  borderCountries = Array<Country>();

  constructor(
    private countriesService: CountriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.listOfCodes = params.getAll('codes');
      this.selectedCountryCode = this.listOfCodes[0];
      this.getCountriesByCode();
    });
  }

  ngOnDestroy(): void {
    this.countrySubscription.unsubscribe();
  }

  getCountriesByCode(): void {
    let codeAPIParamString = '';
    for (const code of this.listOfCodes) {
      codeAPIParamString += `${code};`;
    }
    this.countrySubscription = this.countriesService.getCountriesByAlphaCode(codeAPIParamString)
      .subscribe(countries => {
        this.listOfCountries = countries as Country[];
        this.countryToDisplay = this.listOfCountries.find(country => country.alpha3Code === this.selectedCountryCode);
        this.borderCountries = this.listOfCountries.filter(country => country.alpha3Code !== this.selectedCountryCode);
      });
  }

  navigateBack(): void {
    this.router.navigate(['/']);
  }

  displayBorderCountry(borderCountry: Country): void {
    this.countryToDisplay = borderCountry;
    this.selectedCountryCode = borderCountry.alpha3Code;
    this.borderCountries = this.listOfCountries.filter(country => country.alpha3Code !== this.selectedCountryCode);
  }
}
