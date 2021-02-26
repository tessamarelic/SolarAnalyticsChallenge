import * as fromCountries from './reducers/country.reducers';
import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {CountriesState} from './reducers/country.reducers';

export const selectCountriesState = createFeatureSelector<CountriesState>('countries');

export const selectAllCountries = createSelector(
  selectCountriesState,
  fromCountries.selectAll
);

export const areCountriesLoaded = createSelector(
  selectCountriesState,
  state => state.allCountriesLoaded
);


export const selectRegions = createSelector(
  selectAllCountries,
  regions =>  regions.map(country => country.region),
);

export const selectCountryById = (id: string) => createSelector(
  selectAllCountries,
  countries =>  countries[id]
);

export const selectCountriesByIds = (ids: Array<string>) => createSelector(
  selectAllCountries,
  countries =>  ids.filter(id => countries[id])
);

