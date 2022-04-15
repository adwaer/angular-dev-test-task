import { ForecastModel } from './forecast.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PeriodType } from '@domain/models/period-type';
import { Injectable } from '@angular/core';
import { ForecastSetSearch, ForecastSetType } from './forecast.actions';

@State<ForecastModel>({
	name: 'forecast',
	defaults: {
		filters: {
			search: '',
			type: PeriodType.hourly,
		},
	},
})
@Injectable()
export class ForecastState {
	@Selector()
	static search(state: ForecastModel): string {
		const { filters: { search } } = state;
		return search;
	}

	@Selector()
	static type(state: ForecastModel): PeriodType {
		const { filters: { type } } = state;
		return type;
	}

	@Action(ForecastSetSearch)
	setSearch(ctx: StateContext<ForecastModel>, { payload }: ForecastSetSearch): void {
		const { filters } = ctx.getState();
		ctx.setState({
			...ctx.getState(),
			filters: {
				...filters,
				search: payload,
			},
		});
	}

	@Action(ForecastSetType)
	setType(ctx: StateContext<ForecastModel>, { payload }: ForecastSetType): void {
		const { filters } = ctx.getState();
		ctx.setState({
			...ctx.getState(),
			filters: {
				...filters,
				type: payload,
			},
		});
	}
}
