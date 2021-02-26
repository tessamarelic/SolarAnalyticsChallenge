import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CountriesActions} from './action-types';
import {catchError, concatMap, map} from 'rxjs/operators';
import {CountriesService} from '../../services/countries.service';
import {allCountriesLoaded} from './countries.actions';
import {of} from 'rxjs';

@Injectable()
export class CountriesEffects {

  constructor(private actions$: Actions,
              private countriesService: CountriesService) {}

  loadCountries$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(CountriesActions.loadAllCountries),
        concatMap(action => this.countriesService.getCountries()),
        map(countries => allCountriesLoaded({countries})),
        catchError(() => of({type: '[Countries API] Countries Loaded Error'}))
      )
  );
}
