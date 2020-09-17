import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';
import { CityMode } from './shared/city-mode.enum';


const routes: Routes = [
  { path: 'santiago', component: CitiesComponent, data: { mode: CityMode.Santiago } },
  { path: 'lima', component: CitiesComponent, data: { mode: CityMode.Lima } },
  { path: 'buenosaires', component: CitiesComponent, data: { mode: CityMode.BuenosAires } },
  { path: 'saupaulo', component: CitiesComponent, data: { mode: CityMode.SaoPaulo } },
  { path: '', component: CitiesComponent, data: { mode: CityMode.Select } },
  { path: 'select', component: CitiesComponent, data: { mode: CityMode.Select } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }