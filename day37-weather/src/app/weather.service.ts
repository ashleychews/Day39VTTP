import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Weather } from "./models";

@Injectable()
export class WeatherService {

    //dependency injection
    constructor(private http: HttpClient) {}

    //GET https://api.openweathermap.org/data/2.5/weather?q=singapore&appid=aab91d01b6b6fe7e7f71ccc1f664fbeb
    searchWeatherbyObservable(city: string, key: string): Observable<Weather> {
        const params = new HttpParams()
            .set("q", city)
            .set("appid", key)
        
        return this.http.get<Weather>(`https://api.openweathermap.org/data/2.5/weather`, { params })
    }

}