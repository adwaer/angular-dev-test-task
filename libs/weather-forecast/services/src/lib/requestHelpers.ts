import { environment } from '../../../../../apps/weather-forecast/src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { City } from '@domain/models/city';
import { WeatherTemp, WeatherTempDaily } from '@domain/models/api-responses';
import { WeatherLine } from '@domain/models/weather-line';

export const rangeApiOptions = (city: City, exclude: 'daily' | 'hourly'): Record<string, string> => ({
	lat: city.lat.toString(),
	lon: city.lon.toString(),
	appid: environment.api.key,
	exclude: `current,minutely,${exclude},alerts`,
	units: 'metric',
});

export const cityApiOptions = (cityName: string): Record<string, string> => ({
	q: cityName,
	limit: '1',
	appid: environment.api.key,
});

export const getHttpParams = (options: Record<string, string>): HttpParams => {
	let params = new HttpParams();

	Object.keys(options).forEach((option: string) => {
		params = params.append(option, options[option]);
	});

	return params;
};

export const weatherLineMappers = {
	hourly: (items: WeatherTemp[], cityName: string): WeatherLine => {
		const temps: WeatherTemp[] = [];
		for (let i = 3; i <= 24; i += 3) {
			const item = items[i];
			temps.push({
				name: String(i),
				temp: Math.round(item.temp)
			});
		}

		return {
			city: cityName,
			data: temps,
		};
	},
	daily: (items: WeatherTempDaily[], cityName: string): WeatherLine => {
		return {
			city: cityName,
			data: items.slice(0, 7).map((val, i) => {
				const date = new Date();
				date.setDate(date.getDate() + i);
				return ({
					name: date.toLocaleDateString('en-US', { weekday: 'short' }),
					temp: Math.round(val.temp.day),
				});
			}),
		};
	},
};
