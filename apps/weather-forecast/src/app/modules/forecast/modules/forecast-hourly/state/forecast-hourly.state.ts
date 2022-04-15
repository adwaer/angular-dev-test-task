import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ForecastHourlyModel } from './forecast-hourly.model';
import { WeatherLine } from '@domain/models/weather-line';
import { ForecastHourlyFetch } from './forecast-hourly.actions';
import { WeatherForecastApiService } from '@services/weather-forecast-api.service';
import { Observable, tap } from 'rxjs';
import { fetchForecastApi } from '../../forecast-period-helpers';

export const forecastHourly = 'forecastHourly';

@State<ForecastHourlyModel>({
	name: forecastHourly,
	defaults: {
		data: [],
	},
})
@Injectable()
export class ForecastHourlyState {
	@Selector()
	static data(state: ForecastHourlyModel): WeatherLine[] {
		const { data } = state;
		return data;
	}

	constructor(private service: WeatherForecastApiService) {
	}

	@Action(ForecastHourlyFetch)
	setSearch(ctx: StateContext<ForecastHourlyModel>, { payload }: ForecastHourlyFetch): Observable<unknown> {
		const { data } = ctx.getState();
		const fetchApi = fetchForecastApi(this.service, 'hourly');
		return fetchApi([...data], payload.toLowerCase())
			.pipe(
				tap(result => {
					if (result) {
						ctx.setState({
							data: result,
						});
					}
				})
			)
	}
}
