import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityReportService } from './shared/city-report.service';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { FormsModule } from '@angular/forms';
//import { ReportReducer } from './store/report.reducer'
//import { ReportEffects } from './store/report.effects'
//import { EffectsModule } from '@ngrx/effects';
import { CitiesComponent } from './cities/cities.component';
import { NgxsModule } from '@ngxs/store';
import { ReportState } from './store/report.state'
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forFeature([ReportState]),
  ],
  providers: [
    CityReportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
