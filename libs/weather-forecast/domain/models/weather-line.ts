import { WeatherTemp } from '@domain/models/api-responses';

export interface WeatherLine {
	city: string;
	data: WeatherTemp[];
}
