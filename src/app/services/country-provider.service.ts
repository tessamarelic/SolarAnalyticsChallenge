import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Country} from '../models/country.model';

@Injectable()
export class CountryProviderService {

  private country = new BehaviorSubject(new Country());

  constructor() {
  }

  setCountry(country: Country): void {
    this.country.next(country);
  }

  getCountry(): Observable<Country> {
    return this.country.asObservable();
  }
}
