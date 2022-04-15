import { Disposable } from '@domain/helpers';
import { OnInit } from '@angular/core';
import { Actions, Select, Store } from '@ngxs/store';
import { ForecastState } from '../state/forecast.state';
import { filter, map, mergeMap, Observable, takeUntil } from 'rxjs';
import loading from '@domain/helpers/loading';
import { temperatureDecorator } from '@domain/helpers/decorators';
import { WeatherLine } from '@domain/interfaces';
import { ActionType } from '@ngxs/store/src/actions/symbols';

export abstract class ForecastBase extends Disposable implements OnInit {
	@Select(ForecastState.search) private search$!: Observable<string>;
	columns$: Observable<{ id: string, display: string }[]>;
	rows$: Observable<unknown[]>;
	isLoading$ = loading(this.actions, this.disposed$, [this.fetchCmd]);

	protected constructor(
		private store: Store,
		private actions: Actions,
		dataLines$: Observable<WeatherLine[]>,
		// store action type should be 'any'
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		private fetchCmd: (ActionType | any),
		columnMapper: (data: WeatherLine[]) => { id: string, display: string }[],
		rowMapper: (columns: { id: string, display: string }[], matrix: string[][]) => unknown[]) {
		super();

		this.columns$ = dataLines$
			.pipe(
				filter(data => data && !!data.length),
				map(columnMapper),
			);

		this.rows$ = dataLines$
			.pipe(
				filter(data => data && !!data.length),
				map(data => data.map(({ data, city }) => [city]
					.concat(data.map(item => temperatureDecorator(item.temp))),
				)),
				mergeMap(matrix => this.columns$
					.pipe(
						map(columns => rowMapper(columns, matrix)),
					),
				),
			);
	}

	ngOnInit(): void {
		this.search$.pipe(
			filter(search => !!search && search.length > 1),
			takeUntil(this.disposed$),
		)
			.subscribe(search => {
				this.store.dispatch(new this.fetchCmd(search));
			});
	}
}
