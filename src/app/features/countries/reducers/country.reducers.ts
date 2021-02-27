import {createReducer, on} from '@ngrx/store';
import {Country} from '../../../models/country.model';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {CountriesActions} from '../action-types';

export const countriesFeatureKey = 'countries';

export function selectCountryId(country: Country): number {
  return +country.numericCode;
}

export interface CountriesState extends EntityState<Country>{
  allCountriesLoaded: boolean;
  selectCountryId: number | null;
}

// entity adapter has all crude ops attached
export const adapter = createEntityAdapter<Country>({
  selectId: selectCountryId,
  sortComparer: false
});

// set entity initial state
export const initialCountriesState = adapter.getInitialState({
  allCountriesLoaded: false
});

export const countryReducer = createReducer(
  initialCountriesState,

  on(CountriesActions.allCountriesLoaded,
    (state, action) => adapter.addMany(
      action.countries,
      {...state,
      allCountriesLoaded: true}
    ))
);


export const {
  selectAll
} = adapter.getSelectors();

