import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ForecastBase } from '../forecast-base-component';
import { Actions, Store } from '@ngxs/store';
import { ForecastSetType } from '../../state/forecast.actions';
import { PeriodType } from '@domain/models/period-type';
import { forecastDaily } from './state/forecast-daily.state';
import { ForecastDailyFetch } from './state/forecast-daily.actions';
import { ForecastMappers } from '../forecast-mappers';

@Component({
	selector: 'bp-forecast-daily',
	templateUrl: './forecast-daily.component.html',
	styleUrls: ['./forecast-daily.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastDailyComponent extends ForecastBase {
	constructor(store: Store, actions: Actions) {
		super(store, actions, store.select(state => state[forecastDaily].data), ForecastDailyFetch, ForecastMappers.dailyColumns, ForecastMappers.rows);

		store.dispatch(new ForecastSetType(PeriodType.daily));
	}
}
