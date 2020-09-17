import { Component, OnInit } from '@angular/core';
import { CityMode } from '../shared/city-mode.enum';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoadCityReports } from '../store/report.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private cities: any[];
  private city: any;
  readonly POLLING_TIME: number = 180000; // 3 min polling

  constructor(private store: Store, private router: Router) {
    this.store.dispatch(new LoadCityReports())
  }

  ngOnInit(): void {
    this.cities = Object.values(CityMode).map((val) => {
      return { name: val, value: val };
    })

    this.city = this.cities[0];

    setInterval(this.timerReportCall, this.POLLING_TIME, this.store);
  }

  timerReportCall(st: Store) {
    st.dispatch(new LoadCityReports());
  }

  onSelectChange(event: any) {
    switch (event.name) {
      case CityMode.Santiago: {
        this.router.navigate(['santiago']);
        break;
      }
      case CityMode.Lima: {
        this.router.navigate(['lima']);
        break;
      }
      case CityMode.SaoPaulo: {
        this.router.navigate(['saupaulo']);
        break;
      }
      case CityMode.BuenosAires: {
        this.router.navigate(['buenosaires']);
        break;
      }
      case CityMode.Select: {
        this.router.navigate(['select']);
        break;
      }
      default: {
        this.router.navigate(['select']);
      }
    }
  }
}
