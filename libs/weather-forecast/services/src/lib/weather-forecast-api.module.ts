import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WeatherForecastApiService } from '@services/weather-forecast-api.service';


@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
	]
})
export class WeatherForecastApiModule {
	static forRoot(): ModuleWithProviders<WeatherForecastApiModule> {
		return {
			ngModule: WeatherForecastApiModule,
			providers: [
				WeatherForecastApiService,
			],
		};
	}
}
