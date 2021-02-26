import {Currency} from './currency.model';
import {Language} from './language.model';
import {RegionalBloc} from './regionalBloc.model';

export class Country {
  alpha2Code = '';
  alpha3Code = '';
  altSpelling = new Array<string>();
  area = 0;
  borders = new Array<string>();
  callingCodes = new Array<string>();
  capital = '';
  cioc = '';
  currencies = new Array<Currency>();
  demonym = '';
  flag = '';
  gini = 0;
  languages = new Array<Language>();
  latlng = new Array<number>();
  name = '';
  nativeName = '';
  numericCode = '';
  population = 0;
  region = '';
  regionalBlocs = new Array<RegionalBloc>();
  subregion = '';
  timezones = new Array<string>();
  topLevelDomain = new Array<string>();
  translations = new Map<string, string>();
}
