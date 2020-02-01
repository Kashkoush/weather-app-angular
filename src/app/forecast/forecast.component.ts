import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeatherServiceService } from '../weather-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  @ViewChild('f', { static: false }) forecastForm: NgForm;
  forecastNow: any;
  selectedCityName: string;
  requestTime: any;
  timeInterval: any;

  constructor(private weatherService: WeatherServiceService) { }

  ngOnInit() {
    setTimeout(() => {
      this.forecastForm.form.setValue({ cityName: 'cairo' });
      this.onSubmit(this.forecastForm);
    })
  }

  onSubmit(form: NgForm) {
    console.log(form.form.value);
    this.forecastNow = false;
    this.selectedCityName = form.form.value.cityName;
    this.weatherService.getForecast(this.selectedCityName).subscribe((forecastData: any) => {
      console.log(forecastData);
      this.forecastNow = forecastData;
      this.requestTime = moment().format();
      this.getMoment();
    }, error => {
      console.log(error);
      this.forecastNow = true;
    })
  }

  convertKelvinToCelsius(kelvin) {
    return kelvin - 273.15;
  }

  getMoment() {
    setInterval(() => {
      // console.log(moment(this.requestTime).fromNow());
      this.timeInterval = moment(this.requestTime).fromNow();
    }, 1000);
  }

}
