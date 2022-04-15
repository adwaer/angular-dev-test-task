export const temperatureDecorator = (temp: number): string  => `${temp}°`;
export const timeDecorator = (val: string): string  => `${val.padStart(2, '0')}:00`;
