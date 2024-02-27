import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list.component';
import { WeatherComponent } from './components/weather.component';
import { WeatherService } from './weather.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CityStore } from './city.store';
import { DBService } from './db.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [WeatherService, CityStore, DBService],
  bootstrap: [AppComponent]
})
export class AppModule { }
