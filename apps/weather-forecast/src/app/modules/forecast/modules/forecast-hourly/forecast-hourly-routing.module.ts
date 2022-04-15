import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastHourlyComponent } from './forecast-hourly.component';

const routes: Routes = [
	{
		path: '',
		component: ForecastHourlyComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ForecastHourlyRoutingModule {
}
