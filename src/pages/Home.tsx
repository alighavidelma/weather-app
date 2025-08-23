import { useState } from "react";
import { useWeather } from "../context/WeatherContext";
import { fetchWeather } from "../services/weatherApi";
import WeatherCard from "../components/WeatherCard";
import Spinner from "../components/Spinner";

import { useSearchHistory } from "../hooks/useLocalStorage";
import SearchInput from "../components/SearchInput";
import ToggleThemeButton from "../components/ToggleThemeButton";

export default () => {
  const { weather, setWeather, error, setError } = useWeather();

  const [loading, setLoading] = useState(false);

  const { history, addHistory } = useSearchHistory();

  const handleSearch = async (city: string) => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeather(city);
      setWeather(data);
      addHistory(city);
    } catch (error) {
      setError("شهر موردنظر شما یافت نشد.");
      setWeather(null);
      console.error("Error fetching weather : ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600 p-4 dark:from-gray-900 dark:to-black">
      <h1 className="text-3xl text-white font-bold mb-6">🌤 Weather App</h1>
      <ToggleThemeButton />

      <SearchInput onSearch={handleSearch} />

      {error && <p className="text-red-500 mb-4 text-[20px]">{error}</p>}
      {loading && <Spinner />}
      {weather && !loading && <WeatherCard weather={weather} />}

      {history.length > 0 && (
        <div dir="rtl" className="mt-4">
          {history.length > 0 && (
            <div className="mt-4">
              <h2 className="font-semibold mb-2 dark:text-white">
                آخرین جستجو های شما
              </h2>
              <ul className="flex gap-2 flex-wrap">
                {history.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => {
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
