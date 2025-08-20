import { useState } from "react";
import { useWeather } from "../context/WeatherContext";
import { fetchWeather } from "../services/weatherApi";
import WeatherCard from "../components/WeatherCard";
import Spinner from "../components/Spinner";

export default () => {
  const { weather, setWeather } = useWeather();
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);

    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (error) {
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
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-white text-blue-600 font-bold rounded-md hover:bg-gray-100"
        >
          Search
        </button>
      </div>

      {loading && <Spinner />}
      {weather && !loading && <WeatherCard weather={weather} />}
    </div>
  );
};
