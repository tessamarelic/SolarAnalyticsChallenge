import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Country} from '../../../models/country.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CountriesService} from '../../../services/countries.service';
import {CountryProviderService} from '../../../services/country-provider.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit, OnDestroy {
  countryToDisplay = new Country();
  countrySubscription = new Subscription();
  countriesSubscription = new Subscription();
  selectedCountryCode = '';
  listOfCodes = Array<string>();
  listOfCountries = Array<Country>();
  borderCountries = Array<Country>();
  hasBorderCountries = true;

  constructor(
    private countriesService: CountriesService,
    private route: ActivatedRoute,
    private router: Router,
    private countryProvider: CountryProviderService
  ) {
  }

  ngOnInit(): void {
    this.countrySubscription = this.countryProvider.getCountry().subscribe(country => {
      this.countryToDisplay = country;
      this.selectedCountryCode = this.countryToDisplay.alpha3Code;
      this.createListOfCodes(this.countryToDisplay);
      if (this.countryToDisplay.borders.length > 0) {
        this.getCountriesByCode();
      } else {
        this.hasBorderCountries = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.countrySubscription.unsubscribe();
    this.countriesSubscription.unsubscribe();
  }

  createListOfCodes(selectedCountry: Country): void{
    this.listOfCodes = selectedCountry.borders;
  }

  getCountriesByCode(): void {
    let codeAPIParamString = '';
    for (const code of this.listOfCodes) {
      codeAPIParamString += `${code};`;
    }
    this.countriesSubscription = this.countriesService.getCountriesByAlphaCode(codeAPIParamString)
      .subscribe(countries => {
        if (!!countries){
          this.listOfCountries = countries as Country[];
          this.borderCountries = this.listOfCountries.filter(country => country.alpha3Code !== this.selectedCountryCode);
        }
        this.listOfCountries.push(this.countryToDisplay);
      }, error => {
        console.error(error);
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
