import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';
import {Country} from '../../../models/country.model';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {CountriesActions} from '../action-types';

export const countriesFeatureKey = 'countries';

export interface CountriesState extends EntityState<Country>{
  allCountriesLoaded: boolean;
}

// entity adapter has all crude ops attached
export const adapter = createEntityAdapter<Country>();

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

// export const metaReducers: MetaReducer<CountriesState>[] = !environment.production ? [] : [];
