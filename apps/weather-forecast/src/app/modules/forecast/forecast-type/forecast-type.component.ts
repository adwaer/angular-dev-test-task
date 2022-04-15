import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { ForecastState } from '../state/forecast.state';
import { Observable } from 'rxjs';
import { PeriodType } from '@domain/models/period-type';

@Component({
	selector: 'bp-forecast-type',
	templateUrl: './forecast-type.component.html',
	styleUrls: ['./forecast-type.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastTypeComponent {
	@Select(ForecastState.type) type$!: Observable<PeriodType>;
	@Select(ForecastState.search) search$!: Observable<string>;
}
