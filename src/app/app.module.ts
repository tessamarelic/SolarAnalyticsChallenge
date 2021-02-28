import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {CountriesModule} from './features/countries/countries.module';
import {CountryProviderService} from './services/country-provider.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import {RouterState, StoreRouterConnectingModule} from '@ngrx/router-store';
import {CountriesResolver} from './features/countries/countries.resolver';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import {CountryResolver} from './services/country.resolver';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CountriesModule,
    StoreModule.forRoot(reducers,
      { metaReducers,
        runtimeChecks : {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictActionSerializability: true,
          strictStateSerializability: true
        }
      }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot({}),
    StoreRouterConnectingModule.forRoot({
        stateKey: 'router',
        routerState: RouterState.Minimal
    }
    )
  ],
  providers: [CountryResolver],
  bootstrap: [AppComponent],
})
export class AppModule { }
