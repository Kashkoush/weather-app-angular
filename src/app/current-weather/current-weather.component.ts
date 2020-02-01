import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { WeatherServiceService } from '../weather-service.service';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
  currentTempratureInCelsius: number;
  cityName: string = 'cairo';
  selectedCityName: string;
  weatherIconUrl: string;
  weatherNow: any;
  requestTime: any;
  timeInterval: any;
  loading: boolean = true;
  @ViewChild('f', { static: false }) searchWeatherForm: NgForm;

  constructor(private weatherService: WeatherServiceService) { }

  ngOnInit() {
    setTimeout(() => {
      this.searchWeatherForm.form.setValue({ cityName: 'cairo' });
      this.onSubmit(this.searchWeatherForm);
    })
  }

  convertKelvinToCelsius(kelvin) {
    return kelvin - 273.15;
  }

  onSubmit(form: NgForm) {
    this.weatherNow = false;
    this.selectedCityName = form.form.value.cityName;
    this.weatherService.getCurrentWeather(this.selectedCityName).subscribe((weatherData: any) => {
      console.log(weatherData);
      this.weatherNow = weatherData;
      this.currentTempratureInCelsius = this.convertKelvinToCelsius(weatherData.main.temp);
      this.weatherIconUrl = 'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png';
      console.log(this.weatherIconUrl);
      this.requestTime = moment().format();
      this.getMoment();
    }, error => {
      console.log(error);
      this.weatherNow = false;
    })
  }

  updateWeather() {
    this.searchWeatherForm.form.setValue({ cityName: this.selectedCityName });
    this.onSubmit(this.searchWeatherForm);
  }

  getMoment() {
    setInterval(() => {
      // console.log(moment(this.requestTime).fromNow());
      this.timeInterval = moment(this.requestTime).fromNow();
    }, 1000);
  }

}
