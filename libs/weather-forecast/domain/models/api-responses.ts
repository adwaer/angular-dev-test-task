export interface DailyWeather {
	daily: WeatherTempDaily[];
}

export interface HourlyWeather {
	hourly: WeatherTemp[];
}

export interface WeatherTemp { name: string, temp: number }
export interface WeatherTempDaily { temp: { day: number } }
