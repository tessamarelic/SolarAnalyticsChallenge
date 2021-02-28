import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {Country} from '../models/country.model';
import {Injectable} from '@angular/core';

@Injectable()
export class CountryEntityService
  extends EntityCollectionServiceBase<Country> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super('Country', serviceElementsFactory);

  }
}
