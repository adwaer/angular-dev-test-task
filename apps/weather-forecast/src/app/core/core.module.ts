import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../../environments/environment';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NotificationState } from './state/notification.state';
import { MaterialModule } from '../modules/shared/material.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { WeatherForecastApiModule } from '@services/weather-forecast-api.module';


@NgModule({
	declarations: [
		CoreComponent,
		NotificationsComponent,
	],
	exports: [CoreComponent],
	imports: [
		CommonModule,
		NgxsModule.forRoot([NotificationState], {
			developmentMode: !environment.production,
		}),
		NgxsLoggerPluginModule.forRoot({
			disabled: environment.production,
		}),
		MaterialModule,
		WeatherForecastApiModule.forRoot()
	],
})
export class CoreModule {
}
