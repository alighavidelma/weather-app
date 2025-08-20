import type React from "react";
import type { WeatherData } from "../types";

interface Props {
  weather: WeatherData;
}

const WeatherCard: React.FC<Props> = ({ weather }) => {
  return (
    <div
      dir="rtl"
      className="bg-white rounded-lg p-6 shadow-md w-full max-w-sm text-center"
    >
      <h2 className="text-xl font-bold mb-2">{weather?.city}</h2>
      <p className="text-lg">{weather?.temp}°C</p>
      <p className="capitalize">{weather?.description}</p>
      <p>رطوبت : %{weather?.humidity}</p>
      <p>وزش باد : {weather?.wind}m/s</p>
    </div>
  );
};

export default WeatherCard;
