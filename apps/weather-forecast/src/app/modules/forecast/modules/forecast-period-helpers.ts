import { first, map, Observable, of } from 'rxjs';
import { WeatherLine } from '@domain/interfaces';
import { WeatherForecastApiService } from '@services/weather-forecast-api.service';

export const fetchForecastApi = (service: WeatherForecastApiService, mode: 'daily' | 'hourly') => {
	return (data: WeatherLine[], city: string): Observable<undefined | WeatherLine[]> => {
		const existsItem = data.find(line => line.city.toLowerCase() === city);

		if (existsItem) {
			return of(undefined);
		}

		return service.fetch(city, mode)
			.pipe(
				first(),
				map(line => {
					if (!line) {
						return undefined;
					}

					const exists = data.find(item => item.city.toLowerCase() === line.city.toLowerCase());
					if (exists) {
						return undefined;
					}

					data.push(line);
					return data;
				}),
			);
	};
};
