import {Component, OnDestroy, OnInit} from '@angular/core';
import {of, Subscription} from 'rxjs';
import {Country} from '../../../models/country.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CountriesService} from '../../../services/countries.service';
import {CountryProviderService} from '../../../services/country-provider.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {selectAllCountries, selectCountryById, selectRegions} from '../countries.selectors';
import {map} from 'rxjs/operators';


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
  subscriptions = new Map<string, Subscription>();
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

    this.subscriptions.set('router', this.route.params.subscribe(id => {
      console.log(id);
      this.getSelectedCountry(id.toString());
    }));
    // this.countrySubscription = this.countryProvider.getCountry().subscribe(country => {
    //   this.countryToDisplay = country;
    //   this.selectedCountryCode = this.countryToDisplay.alpha3Code;
    //   this.createListOfCodes(this.countryToDisplay);
    //   if (this.countryToDisplay.borders.length > 0) {
    //     this.getCountriesByCode();
    //   } else {
    //     this.hasBorderCountries = false;
    //   }
    // });
  }

  ngOnDestroy(): void {
    for (const subName in this.subscriptions) {
      this.subscriptions[subName].unsubscribe();
    }
  }

  getSelectedCountry(countryId: string): void {
    // this.subscriptions.set('selectedCountry', this.store.pipe(
    //   select(selectCountryById, {id}))
    // .subscribe(country => {
    //   console.log(country);
    //   this.countryToDisplay = country as unknown as Country;
    //   this.selectedCountryCode = this.countryToDisplay.alpha3Code;
      // if (this.countryToDisplay.borders.length) {
      //   this.getCountriesByCode(this.countryToDisplay.borders);
      // }
    // }));
    // this.store.pipe(
    //   select(selectCountryById, {id: counryId}))
    //   .subscribe(country => {
    //     console.log(country.projector);
    //     this.countryToDisplay = country as unknown as Country;
    //     this.selectedCountryCode = this.countryToDisplay.alpha3Code;
    //     if (this.countryToDisplay.borders.length) {
    //       this.getCountriesByIds(this.countryToDisplay.borders);
    //     }
    //   });

    this.store.pipe(
      select(selectAllCountries))
      .subscribe(countries => {
        this.countries = countries;
        this.countryToDisplay = countries.find(country => country.alpha3Code === countryId);
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
    // let codeAPIParamString = '';
    // for (const code of this.listOfCodes) {
    //   codeAPIParamString += `${code};`;
    // }
    // this.countriesSubscription = this.countriesService.getCountriesByAlphaCode(codeAPIParamString)
    //   .subscribe(countries => {
    //     if (!!countries){
    //       this.listOfCountries = countries as Country[];
    //       this.borderCountries = this.listOfCountries.filter(country => country.alpha3Code !== this.selectedCountryCode);
    //     }
    //     this.listOfCountries.push(this.countryToDisplay);
    //   }, error => {
    //     console.error(error);
    //   });
    // this.store.pipe(
    //   select(selectCountriesByIds, {id: countryIds}))
    //   .subscribe(countries => {
    //     if (!!countries) {
    //       this.listOfCountries = countries as unknown as Country[];
    //       this.borderCountries = this.listOfCountries.filter(country => country.alpha3Code !== this.selectedCountryCode);
    //       this.listOfCountries.push(this.countryToDisplay);
    //     }
    //   });
        for (const country of this.countries){
          const count = countryIds.find(code => code === country.alpha3Code);
          if (!!count) {
            this.listOfCountries.push(country);
          }
        }
        this.borderCountries = this.listOfCountries.filter(country => country.alpha3Code !== this.selectedCountryCode);
        this.listOfCountries.push(this.countryToDisplay);
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
