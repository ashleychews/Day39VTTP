import { Component, OnInit, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Weather } from '../models';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {

  private weatherSvc = inject(WeatherService)

  private activatedRoute = inject(ActivatedRoute)

  city: string = ''

  apiKey = 'aab91d01b6b6fe7e7f71ccc1f664fbeb'

  weather$!: Observable<Weather>

  ngOnInit(): void {
    this.city = this.activatedRoute.snapshot.params['city']
    this.weather$ = this.weatherSvc.searchWeatherbyObservable(this.city, this.apiKey)
    .pipe(
      //defining response:any is necessary so that we dont have to exactly match the data
      map((response:any) => ({
        name: response.name,
        temp: response.main.temp,
        pressure: response.main.pressure,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        speed: response.wind.speed,
        deg: response.wind.deg
      }))
    )
  }


}

