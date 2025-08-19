export interface WeatherData {
  city: string;
  temp: number;
  description: string;
  humidity: number;
  wind: number;
}

export interface WeatherContextType {
  weather: WeatherData | null;
  setWeather: (data: WeatherData | null) => void;
}
