import type React from "react";

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
  history: string[];
  setHistory: React.Dispatch<React.SetStateAction<string[]>>;
}
