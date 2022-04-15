import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Actions, Store } from '@ngxs/store';
import { ForecastBase } from '../forecast-base-component';
import { ForecastSetType } from '../../state/forecast.actions';
import { PeriodType } from '@domain/models/period-type';
import { ForecastHourlyFetch } from './state/forecast-hourly.actions';
import { forecastHourly } from './state/forecast-hourly.state';
import { ForecastMappers } from '../forecast-mappers';

@Component({
	selector: 'bp-forecast-hourly',
	templateUrl: './forecast-hourly.component.html',
	styleUrls: ['./forecast-hourly.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastHourlyComponent extends ForecastBase {
	constructor(store: Store, actions: Actions) {
		super(store, actions, store.select(state => state[forecastHourly].data), ForecastHourlyFetch, ForecastMappers.hourlyColumns, ForecastMappers.rows);

		store.dispatch(new ForecastSetType(PeriodType.hourly));
	}
}
