import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForecastHourlyRoutingModule } from './forecast-hourly-routing.module';
import { ForecastHourlyComponent } from './forecast-hourly.component';
import { NgxsModule } from '@ngxs/store';
import { ForecastHourlyState } from './state/forecast-hourly.state';
import { ControlsModule } from '../../../shared/controls/controls.module';


@NgModule({
	declarations: [
		ForecastHourlyComponent,
	],
	imports: [
		CommonModule,
		ForecastHourlyRoutingModule,
		NgxsModule.forFeature([ForecastHourlyState]),
		ControlsModule,
	],
})
export class ForecastHourlyModule {
}
