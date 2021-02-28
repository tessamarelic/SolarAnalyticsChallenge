import {HttpClient} from '@angular/common/http';
import {DefaultDataService, HttpUrlGenerator} from '@ngrx/data';
import {Country} from '../models/country.model';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class CountriesDataService extends DefaultDataService<Country> {

  readonly countriesUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Country', http, httpUrlGenerator);

  }

  getAll(): Observable<Country[]> {
    const httpOptions: object = {
      observe: 'response' as 'body',
      responseType: 'json'
    };
    const countries = this.http.get(this.countriesUrl)
      .pipe(
        map (data => {
          return data as Country[];
        })
      );
    return countries;
  }

}
