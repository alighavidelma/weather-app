import { useState } from "react";
import { useWeather } from "../context/WeatherContext";
import { fetchWeather } from "../services/weatherApi";
import WeatherCard from "../components/WeatherCard";
import Spinner from "../components/Spinner";
import { motion } from "framer-motion";
import { useSearchHistory } from "../hooks/useLocalStorage";

export default () => {
  const { weather, setWeather, error, setError } = useWeather();
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const { history, addHistory } = useSearchHistory();

  const handleSearch = async (searchCity?: string) => {
    const targetCity = searchCity ?? city;
    if (!targetCity.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeather(targetCity);
      setWeather(data);
      addHistory(targetCity);
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
          onClick={() => handleSearch(city)}
          className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition"
        >
          Search
        </motion.button>
      </div>
      {error && <p className="text-red-500 mb-4 text-[20px]">{error}</p>}
      {loading && <Spinner />}
      {weather && !loading && <WeatherCard weather={weather} />}
      {history.length > 0 && (
        <div dir="rtl" className="mt-4">
          {history.length > 0 && (
            <div className="mt-4">
              <h2 className="font-semibold mb-2">آخرین جستجو های شما</h2>
              <ul className="flex gap-2 flex-wrap">
                {history.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => {
                        setCity(item);
                        handleSearch(item);
                      }}
                      className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
