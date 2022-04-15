import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastDailyComponent } from './forecast-daily.component';

const routes: Routes = [
	{
		path: '',
		component: ForecastDailyComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ForecastDailyRoutingModule {
}
