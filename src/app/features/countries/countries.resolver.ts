import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CountriesService} from '../../services/countries.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesResolver implements Resolve<Observable<object>> {

  constructor(private countriesService: CountriesService){}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<object> {
    return this.countriesService.getCountries();
  }
}
