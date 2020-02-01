import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForecastComponent } from './forecast/forecast.component';


const routes: Routes = [
  { path: '', component: CurrentWeatherComponent},
  { path: 'forecast', component: ForecastComponent},
  { path: '**', component: CurrentWeatherComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
