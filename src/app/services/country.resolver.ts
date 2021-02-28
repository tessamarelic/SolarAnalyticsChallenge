import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CountryEntityService} from './countries-entity.service';
import {filter, first, last, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class CountryResolver implements Resolve<boolean> {

  constructor(private countryService: CountryEntityService) {

  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<boolean> {

    return this.countryService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.countryService.getAll();
          }
        }),
        filter(loaded => !!loaded),
        first()
      );

  }

}
