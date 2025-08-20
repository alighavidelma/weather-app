import type React from "react";
import type { WeatherData } from "../types";
import { motion } from "framer-motion";

interface Props {
  weather: WeatherData;
}

const WeatherCard: React.FC<Props> = ({ weather }) => {
  return (
    // <div
    //   dir="rtl"
    //   className="bg-yellow-200 rounded-lg p-6 shadow-md w-full max-w-sm text-center"
    // >
    //   <h2 className="text-xl font-bold mb-2">{weather?.city}</h2>
    //   <img
    //     src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
    //     alt={weather.description}
    //     className="mx-auto"
    //   />
    //   <p className="text-lg">{weather?.temp}°C</p>
    //   <p className="capitalize">{weather?.description}</p>
    //   <p>رطوبت : %{weather?.humidity}</p>
    //   <p>وزش باد : {weather?.wind}m/s</p>
    // </div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="backdrop-blur-lg bg-white/20 rounded-2xl shadow-lg p-6 w-full max-w-sm text-center border border-white/30"
    >
      <h2 className="text-2xl font-bold text-white drop-shadow-md mb-2">
        {weather.city}
      </h2>
      <img
        src={`http://openweathermap.org/img/wn/${weather.icon}@4x.png`}
        alt={weather.description}
        className="mx-auto mb-2"
      />
      <p className="text-4xl font-extrabold text-white drop-shadow-lg">
        {Math.round(weather.temp)}°C
      </p>
      <p className="capitalize text-white/90 mb-4">{weather.description}</p>

      <div className="grid grid-cols-2 gap-4 text-sm text-white/90">
        <div className="bg-white/10 rounded-xl p-3 shadow-inner">
          <p className="font-semibold">رطوبت</p>
          <p>{weather.humidity}%</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3 shadow-inner">
          <p className="font-semibold">باد</p>
          <p>{weather.wind} m/s</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
