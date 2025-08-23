import {
  type ForecastData,
  type ForecastItem,
  type WeatherData,
} from "../types";

const API_KEY = "4a0c80befc704eb48ca9667affd1b920";

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();

  return {
    city: data.name,
    temp: data.main.temp,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    wind: data.wind.speed,
    icon: data.weather[0].icon,
  };
};

//Forecast API
export const fetchForecast = async (city: string): Promise<ForecastData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}&lang=fa`
  );

  if (!response.ok) throw new Error("Failed to fetch forecast data");

  const data = await response.json();

  const dailyData: ForecastItem[] = data.list
    .filter((item: any) => item.dt_txt.includes("12:00:00"))
    .map((item: any) => ({
      date: new Date(item.dt * 1000).toLocaleDateString("fa-IR", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
      temp: item.main.temp,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    }));

  return {
    city: data.city.name,
    list: dailyData.slice(0, 5),
  };
};
