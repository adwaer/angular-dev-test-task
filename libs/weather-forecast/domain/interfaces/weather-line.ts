import { WeatherTemp } from '@domain/interfaces/api-responses';

export interface WeatherLine {
	city: string;
	data: WeatherTemp[];
}
