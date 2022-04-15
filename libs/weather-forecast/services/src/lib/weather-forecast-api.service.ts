import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, map, Observable, pluck, Subject, switchMap, throwError } from 'rxjs';

import { City, DailyWeather, HourlyWeather, WeatherLine } from '@domain/interfaces';
import { environment } from '../../../../../apps/weather-forecast/src/environments/environment';
import { cityApiOptions, getHttpParams, rangeApiOptions, weatherLineMappers } from '@services/requestHelpers';

@Injectable()
export class WeatherForecastApiService {
	private errorSubj$ = new Subject<string>();
	error$ = this.errorSubj$.asObservable();

	constructor(private readonly httpClient: HttpClient) {}

	fetch(cityName: string, mode: 'daily' | 'hourly'): Observable<WeatherLine> {
		return this.fetchCity(cityName).pipe(
			switchMap(city => {
				if (!city) {
					return EMPTY;
				}
				return mode === 'daily' ? this.fetchDaily(city) : this.fetchHourly(city);
			})
		);
	}

	private fetchDaily(city: City): Observable<WeatherLine> {
		const options = rangeApiOptions(city, 'hourly');
		const params = getHttpParams(options);

		return this.httpClient.get<DailyWeather>(environment.api.weatherApiUrl, { params }).pipe(
			pluck('daily'),
			catchError(err => {
				this.throwError(err.message || 'Error!');
				return throwError(err);
			}),
			map(data => weatherLineMappers.daily(data, city.name))
		);
	}

	private fetchHourly(city: City): Observable<WeatherLine> {
		const options = rangeApiOptions(city, 'daily');
		const params = getHttpParams(options);

		return this.httpClient.get<HourlyWeather>(environment.api.weatherApiUrl, { params }).pipe(
			pluck('hourly'),
			catchError(err => {
				this.throwError(err.message || 'Error!');
				return throwError(err);
			}),
			map(data => weatherLineMappers.hourly(data, city.name))
		);
	}

	private fetchCity(name: string): Observable<City> {
		const options = cityApiOptions(name);
		const params = getHttpParams(options);

		return this.httpClient.get<City[]>(environment.api.cityApiUrl, { params }).pipe(
			catchError(err => {
				this.throwError(err.message || 'Error!');
				return throwError(err);
			}),
			map(cities => {
				if (!cities.length) {
					this.throwError('City was not found!');
				}
				if (cities.length > 1) {
					this.throwError('Too many cities found!');
				}
				return cities[0];
			})
		);
	}

	private throwError(message: string): void {
		this.errorSubj$.next(message);
	}
}
