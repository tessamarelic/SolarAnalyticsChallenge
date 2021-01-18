import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  readonly countriesUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(private http: HttpClient) {
  }

  getCountries(): Observable<object> {
    const httpOptions: object = {
      observe: 'response' as 'body',
      responseType: 'json'
    };
    return this.http.get(this.countriesUrl);
  }

  getCountriesByAlphaCode(stringOfcodes: string): Observable<object> {
    const httpOptions: object = {
      observe: 'response' as 'body',
      responseType: 'json'
    };
    return this.http.get(`https://restcountries.eu/rest/v2/alpha?codes=${stringOfcodes}`);
  }
}
