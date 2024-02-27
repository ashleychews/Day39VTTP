import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list.component';
import { WeatherComponent } from './components/weather.component';

const routes: Routes = [
  { path: '', component: ListComponent},

  { path: 'weather/:city', component: WeatherComponent},

  //wild card
  { path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
