import { Component, OnInit } from '@angular/core';
import { CityMode } from '../shared/city-mode.enum';
import { Report } from '../shared/report.model';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Select } from '@ngxs/store';
import { ReportState } from '../store/report.state';
import { Observable } from 'rxjs';
import { Phrase } from '../shared/phrase.enum';
import { Link } from '../shared/link.enum';
import { City } from '../shared/city.enum';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  private currentReport: Report;
  private currentCityPhrase: string;
  private currentCityName: string;
  private backgroundImg: string;
  private descriptionShort: string;
  private description: string;
  private temp: string;
  private pressure: string;
  private humidity: string;
  private wind: string;
  private clouds: string;
  private isCity: boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  @Select(ReportState.getAllReports) reports: Observable<Report[]>;

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: Data) => {
     
      if (data.mode === CityMode.Select) {
        this.isCity = false;
        this.currentCityPhrase = Phrase['Select']
        this.currentCityName = CityMode['Select']
        this.backgroundImg = Link['Select']
      } else {
        this.reports.subscribe(reports => {
          reports.map(report => {
            if (report.name === data.mode) {
              this.currentReport = report;
              this.setWeatherProp(this.currentReport);
              this.currentCityPhrase = Phrase[report.name]
              this.currentCityName = City[report.name]
              this.backgroundImg = Link[report.name]
              this.isCity = true;
            }
          })
        });
      }
      console.log("\n\ncity:\n" + this.currentCityName + "\n\n" + JSON.stringify(this.currentReport))
    });
  }

  setWeatherProp(jsn: any): void {
    if (jsn !== undefined) {
      this.descriptionShort = jsn.weather[0].main;
      this.description = jsn.weather[0].description;
      this.temp = jsn.main.temp;
      this.pressure = jsn.main.pressure;
      this.humidity = jsn.main.humidity;
      this.wind = jsn.wind.speed;
      this.clouds = jsn.clouds.all;
    }
  }
}