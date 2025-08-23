export interface WeatherData {
  city: string;
  temp: number;
  description: string;
  humidity: number;
  wind: number;
  icon: string;
}

export interface WeatherContextType {
  weather: WeatherData | null;
  setWeather: (data: WeatherData | null) => void;
  error: string | null;
  setError: (msg: string | null) => void;
}

export interface ForecastItem {
  date: string;
  temp: number;
  description: string;
  icon: string;
}

export interface ForecastData {
  city: string;
  list: ForecastItem[];
}
