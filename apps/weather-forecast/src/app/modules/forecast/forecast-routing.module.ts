import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastComponent } from './forecast.component';

const routes: Routes = [
	{
		path: '',
		component: ForecastComponent,
		children: [
			{
				path: 'hourly',
				loadChildren: () => import('./modules/forecast-hourly/forecast-hourly.module').then(m => m.ForecastHourlyModule),
			},
			{
				path: 'daily',
				loadChildren: () => import('./modules/forecast-daily/forecast-daily.module').then(m => m.ForecastDailyModule),
			},
			{
				path: '',
				redirectTo: 'hourly'
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ForecastRoutingModule {
}
