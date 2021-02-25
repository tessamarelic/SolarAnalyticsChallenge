import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CountriesService} from '../../services/countries.service';
import {Country} from '../../models/country.model';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {filter, finalize, first, tap} from 'rxjs/operators';
import {allCountriesLoaded, loadAllCountries} from './countries.actions';
import {areCountriesLoaded} from './countries.selectors';

@Injectable({
  providedIn: 'root'
})
export class CountriesResolver implements Resolve<any> {
  loading = false;

  constructor(private countriesService: CountriesService,
              private store: Store<AppState>){}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    return this.store
      .pipe(
        select(areCountriesLoaded),
        tap(countriesLoaded => {
          if (!this.loading && !countriesLoaded) {
            this.loading = true;
            this.store.dispatch(loadAllCountries());
          }
        }),
        filter(countriesLoaded => countriesLoaded),
        first(),
        finalize(() => this.loading = false)
      );
  }
}
