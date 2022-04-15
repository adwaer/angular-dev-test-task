import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForecastDailyRoutingModule } from './forecast-daily-routing.module';
import { ForecastDailyComponent } from './forecast-daily.component';
import { NgxsModule } from '@ngxs/store';
import { ControlsModule } from '../../../shared/controls/controls.module';
import { ForecastDailyState } from './state/forecast-daily.state';


@NgModule({
	declarations: [
		ForecastDailyComponent,
	],
	imports: [
		CommonModule,
		ForecastDailyRoutingModule,
		NgxsModule.forFeature([ForecastDailyState]),
		ControlsModule,
	],
})
export class ForecastDailyModule {
}
