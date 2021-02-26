import {Component, OnDestroy, OnInit} from '@angular/core';
import {CountriesService} from '../../../services/countries.service';
import {Observable, of, Subscription} from 'rxjs';
import {Country} from '../../../models/country.model';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CountryProviderService} from '../../../services/country-provider.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {selectAllCountries, selectRegions} from '../countries.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  countries = new Array<Country>();
  filteredListOfCountries = new Observable<Country[]>();
  searchFormControl = new FormControl('');
  selectRegionFormControl = new FormControl('');
  listOfRegions = new Array<string>();
  subscriptions = new Map<string, Subscription>();

  constructor(
    private countriesService: CountriesService,
    private route: ActivatedRoute,
    private router: Router,
    private countryProvider: CountryProviderService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.selectRegionFormControl.setValue('');
    this.getCountriesData();
  }

   ngOnDestroy(): void{
      for (const subName in this.subscriptions) {
        this.subscriptions[subName].unsubscribe();
      }
   }

  getCountriesData(): void {
    this.subscriptions.set('allCountries', this.store.pipe(select(selectAllCountries)).subscribe(countries => {
      this.countries = countries;
      this.filteredListOfCountries = of(this.countries);
    }));

    this.subscriptions.set('regions', this.store.pipe(select(selectRegions)).subscribe(regions => {
      const setOfRegions = new Set(regions);
      this.listOfRegions = Array.from(setOfRegions).sort();
      }));
  }

  filterCountriesList(): void {
    const chosenCountry = this.searchFormControl.value.trim();
    if (this.checkValueToFilter(chosenCountry)) {
      this.filteredListOfCountries = of(this.countries.filter((country) => {
        return country.name.toLowerCase().indexOf(chosenCountry.toLowerCase()) > -1;
      }));
    }
  }

  filterCountriesByRegion(): void {
    const region = this.selectRegionFormControl.value;
    if (this.checkValueToFilter(region)) {
      this.filteredListOfCountries = of(this.countries.filter((country) => {
        return country.region.toLowerCase().indexOf(region.toLowerCase()) > -1;
      }));
    }
  }

  checkValueToFilter(valueToCheck: string): boolean {
    if (!valueToCheck) {
      this.filteredListOfCountries = of(this.countries);
      return false;
    }
    return true;
  }

  showCountryDetails(selectedCountry: Country): void {
    // this.countryProvider.setCountry(selectedCountry);
    this.router.navigate(['country-details', selectedCountry.alpha3Code]);
  }
}
