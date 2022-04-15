import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForecastRoutingModule } from './forecast-routing.module';
import { ForecastComponent } from './forecast.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { ForecastSearchComponent } from './forecast-search/forecast-search.component';
import { ForecastTypeComponent } from './forecast-type/forecast-type.component';
import { NgxsModule } from '@ngxs/store';
import { ForecastState } from './state/forecast.state';


@NgModule({
	declarations: [
		ForecastComponent,
		ForecastSearchComponent,
		ForecastTypeComponent,
	],
	imports: [
		CommonModule,
		ForecastRoutingModule,
		ReactiveFormsModule,
		MaterialModule,
		NgxsModule.forFeature([ForecastState]),
	],
})
export class ForecastModule {
}
