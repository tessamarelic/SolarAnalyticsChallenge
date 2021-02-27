import * as fromCountries from './reducers/country.reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CountriesState} from './reducers/country.reducers';
import {Country} from '../../models/country.model';

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

export const selectCountryById = (id) => createSelector(
  selectAllCountries,
  (countries) =>  {
    return countries.find(country => country.numericCode === id);
  }
);

export const selectCountriesByIds = (ids) => createSelector(
  selectAllCountries,
  (countries) => {
    const newCountries = Array<Country>();
    for (const country of countries){
      const value = ids.find(code => code === country.alpha3Code);
      if (!!value){
        newCountries.push(country);
      }
    }
    return newCountries;
  }
);

