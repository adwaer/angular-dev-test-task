import { PeriodType } from '@domain/models/period-type';

export interface FilterModel {
	city: string;
	type: PeriodType;
}

