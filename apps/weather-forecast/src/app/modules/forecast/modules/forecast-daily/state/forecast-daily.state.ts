import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ForecastDailyModel } from './forecast-daily.model';
import { WeatherLine } from '@domain/models/weather-line';
import { ForecastDailyFetch } from './forecast-daily.actions';
import { WeatherForecastApiService } from '@services/weather-forecast-api.service';
import { Observable, tap } from 'rxjs';
import { fetchForecastApi } from '../../forecast-period-helpers';

export const forecastDaily = 'forecastDaily';

@State<ForecastDailyModel>({
	name: forecastDaily,
	defaults: {
		data: [],
	},
})
@Injectable()
export class ForecastDailyState {
	@Selector()
	static data(state: ForecastDailyModel): WeatherLine[] {
		const { data } = state;
		return data;
	}

	constructor(private service: WeatherForecastApiService) {
	}

	@Action(ForecastDailyFetch)
	setSearch(ctx: StateContext<ForecastDailyModel>, { payload }: ForecastDailyFetch): Observable<unknown> {
		const { data } = ctx.getState();
		const fetchApi = fetchForecastApi(this.service, 'daily');
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
