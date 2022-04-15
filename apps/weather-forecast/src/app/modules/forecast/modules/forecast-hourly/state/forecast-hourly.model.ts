import { WeatherLine } from '@domain/models/weather-line';

export interface ForecastHourlyModel {
	data: WeatherLine[]
}
