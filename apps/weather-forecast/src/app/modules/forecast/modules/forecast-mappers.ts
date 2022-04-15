import { WeatherLine } from '@domain/models/weather-line';
import { timeDecorator } from '@domain/helpers/decorators';

export const ForecastMappers = {
	hourlyColumns: (data: WeatherLine[]): { id: string, display: string }[] => {
		const [row] = data;
		const valColumns = row.data.map(item => ({ id: item.name, display: timeDecorator(item.name) }));

		return [{ id: 'city', display: 'City Name' }].concat(valColumns);
	},
	dailyColumns: (data: WeatherLine[]): { id: string, display: string }[] => {
		const [row] = data;
		const valColumns = row.data.map(item => ({ id: item.name, display: item.name }));

		return [{ id: 'city', display: 'City Name' }].concat(valColumns);
	},
	rows: (columns: { id: string, display: string }[], matrix: string[][]): unknown[] => {
		const result = [];
		for (const line of matrix) {
			const obj: unknown = {}
			for (let i = 0; i < line.length; i++) {
				// todo: determine this weird rule
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				obj[columns[i].id] = line[i];
			}

			result.push(obj);
		}

		return result;
	}
}
