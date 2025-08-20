import { useState } from "react";
import { useWeather } from "../context/WeatherContext";
import { fetchWeather } from "../services/weatherApi";
import WeatherCard from "../components/WeatherCard";
import Spinner from "../components/Spinner";
import { motion } from "framer-motion";

export default () => {
  const { weather, setWeather, error, setError } = useWeather();
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (error) {
      setError("شهر موردنظر شما یافت نشد.");
      setWeather(null);
      console.error("Error fetching weather : ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600 p-4">
      <h1 className="text-3xl text-white font-bold mb-6">🌤 Weather App</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, rotate: -5 }}
          onClick={handleSearch}
          className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition"
        >
          Search
        </motion.button>
      </div>
      {error && <p className="text-red-500 mb-4 text-[20px]">{error}</p>}
      {loading && <Spinner />}
      {weather && !loading && <WeatherCard weather={weather} />}
    </div>
  );
};
