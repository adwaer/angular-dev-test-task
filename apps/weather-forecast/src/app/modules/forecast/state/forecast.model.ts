import { PeriodType } from '@domain/models/period-type';

export interface ForecastModel {
	filters: {
		search: string;
		type: PeriodType
	}
}
