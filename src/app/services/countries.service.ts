import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, Observable, of} from 'rxjs';
import {Country} from '../models/country.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  readonly countriesUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(private http: HttpClient) {
  }

  getCountries(): Observable<Country[]> {
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

  getCountriesByAlphaCode(stringOfCodes: string): Observable<object> {
    const httpOptions: object = {
      observe: 'response' as 'body',
      responseType: 'json'
    };
    return this.http.get(`https://restcountries.eu/rest/v2/alpha?codes=${stringOfCodes}`);
  }
}
