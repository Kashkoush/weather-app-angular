import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(private http: HttpClient) { }

  getCurrentWeather(city: string) {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=b9039fd9dd24311f958bedded7689b56');
  }

  getForecast(city: string) {
    return this.http.get('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID=b9039fd9dd24311f958bedded7689b56')
  }

}
