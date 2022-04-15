import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { TableLoaderComponent } from './table-loader/table-loader.component';
import { ForecastTableComponent } from './forecast-table/forecast-table.component';


@NgModule({
	declarations: [TableLoaderComponent, ForecastTableComponent],
	exports: [TableLoaderComponent, ForecastTableComponent],
	imports: [
		CommonModule,
		MaterialModule,
	],
})
export class ControlsModule {
}
