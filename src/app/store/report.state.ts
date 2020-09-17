
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Report } from '../shared/report.model'
import { LoadCityReports } from '../store/report.actions';
import { CityReportService } from '../shared/city-report.service'
import {tap} from 'rxjs/operators';

export class ReportStateModel {
	cityReports: Report[];
}

@State<ReportStateModel>({
	name: 'reports',
	defaults: {
		cityReports: [],
	}
})

export class ReportState {
	constructor(private cityReportService: CityReportService) {}

	@Selector()
	static getAllReports(state: ReportStateModel) {
		return state.cityReports;
	}

	@Action(LoadCityReports)
	loadCityReports({ getState, setState }: StateContext<ReportStateModel>) {
		return this.cityReportService.getAllReport().pipe(tap((result) => {
			console.log('\n\nCities refresch:\n'+  JSON.stringify(result))
            const state = getState();
            setState({
                ...state,
                cityReports: result,
            });
        }));
    }
}
