import type React from "react";
import type { ForecastItem } from "../types";

interface Props {
  forecast: ForecastItem;
}

const ForecastCard: React.FC<Props> = ({ forecast }) => {
  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadowmd flex flex-col items-center text-center">
      <p className="font-semibold mb-2">{forecast.date}</p>
      <img
        src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
        alt={forecast.description}
      />
      <p className="text-lg font-bold">{forecast.temp.toFixed(1)}°C</p>
      <p className="text-sm capitalize">{forecast.description}</p>
    </div>
  );
};

export default ForecastCard;
