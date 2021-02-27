import {Component, OnDestroy, OnInit} from '@angular/core';
import {of, Subscription} from 'rxjs';
import {Country} from '../../../models/country.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CountriesService} from '../../../services/countries.service';
import {CountryProviderService} from '../../../services/country-provider.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {selectAllCountries, selectCountriesByIds, selectCountryById, selectRegions} from '../countries.selectors';
import {count, map, take} from 'rxjs/operators';


@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {
  countryToDisplay = new Country();
  selectedCountryCode = '';
  listOfCodes = Array<string>();
  listOfCountries = Array<Country>();
  borderCountries = Array<Country>();
  hasBorderCountries = true;
  countries = Array<Country>();

  constructor(
    private countriesService: CountriesService,
    private route: ActivatedRoute,
    private router: Router,
    private countryProvider: CountryProviderService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(param => {
      this.getSelectedCountry(param.id);
    });
  }

  getSelectedCountry(countryId: string): void {
    this.store.select(
      selectCountryById(countryId))
      .pipe(take(1))
      .subscribe(val => {
        this.countryToDisplay = val;
        this.selectedCountryCode = this.countryToDisplay.alpha3Code;
        if (this.countryToDisplay.borders.length) {
          this.getCountriesByIds(this.countryToDisplay.borders);
        }
});
  }

  createListOfCodes(selectedCountry: Country): void{
    this.listOfCodes = selectedCountry.borders;
  }

  getCountriesByIds(countryIds: Array<string>): void {
    this.store.select(
      selectCountriesByIds(countryIds)).pipe(take(1))
      .subscribe(countries => {
        if (!!countries) {
          this.listOfCountries = countries;
          this.borderCountries = this.listOfCountries.filter(country => country.alpha3Code !== this.selectedCountryCode);
          this.listOfCountries.push(this.countryToDisplay);
        }
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
