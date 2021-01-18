import {Component, OnDestroy, OnInit} from '@angular/core';
import {CountriesService} from '../../../services/countries.service';
import {Observable, of, Subscription} from 'rxjs';
import {Country} from '../../../models/country.model';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

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
  countriesSubscription = new Subscription();

  constructor(
    private countriesService: CountriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.selectRegionFormControl.setValue('');
    this.getCountriesData();
  }

  ngOnDestroy(): void {
    this.countriesSubscription.unsubscribe();
  }

  getCountriesData(): void {
    this.countriesSubscription = this.countriesService.getCountries().subscribe(countries => {
      this.countries = countries as Country[];
      const setOfRegions = new Set<string>();
      for (const country of this.countries) {
        if (!!country.region) {
          setOfRegions.add(country.region);
        }
      }
      this.listOfRegions = Array.from(setOfRegions).sort();
      this.filteredListOfCountries = of(this.countries);
    }, error => {
      console.error(error);
    });
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

  showCountryDetails(country: Country): void {
    const codeList = [country.alpha3Code, ...country.borders];
    this.router.navigate(['country-details'], {queryParams: {codes: codeList}});
  }
}
