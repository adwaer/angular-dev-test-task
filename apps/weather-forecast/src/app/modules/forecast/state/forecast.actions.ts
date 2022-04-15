import { PeriodType } from '@domain/models/period-type';

export class ForecastSetSearch {
	static readonly type = '[Forecast] Set search';

	constructor(public payload: string) {}
}

export class ForecastSetType {
	static readonly type = '[Forecast] Set type';

	constructor(public payload: PeriodType) {}
}
