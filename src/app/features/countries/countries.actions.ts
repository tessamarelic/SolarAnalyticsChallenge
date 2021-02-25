import {createAction, props} from '@ngrx/store';
import {Country} from '../../models/country.model';
import {Observable} from 'rxjs';


export const loadAllCountries = createAction(
  '[Country Resolver] load all Countries'
);

export const allCountriesLoaded = createAction(
  '[Load Countries Effect] All Countries Loaded',
  props<{countries: Country[]}>()
);
