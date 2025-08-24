import type React from "react";
import { useWeather } from "../context/WeatherContext";
import { useEffect, useState } from "react";
import type { ForecastItem } from "../types";
import { fetchForecast } from "../services/weatherApi";
import Spinner from "../components/Spinner";
import ForecastCard from "../components/ForecastCard";
import { Link } from "react-router-dom";

const ForecastPage: React.FC = () => {
  const { weather } = useWeather();
  const [forecastList, setForecastList] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadForecast = async () => {
      if (!weather?.city) return;
      setLoading(true);
      setError(null);

      try {
        const data = await fetchForecast(weather.city);
        setForecastList(data.list);
      } catch (error) {
        setError("خطا در دریافت پیش بینی هوا");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadForecast();
  }, [weather]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600 p-4">
      <h1 className="text-3xl text-white font-bold mb-6">
        پیش بینی ۵ روز آینده
      </h1>

      <Link
        to="/"
        className="mb-6 px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
      >
        بازگشت به صفحه اصلی 🏠
      </Link>

      {loading && <Spinner />}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {forecastList.map((item) => (
          <ForecastCard key={item.date} forecast={item} />
        ))}
      </div>
    </div>
  );
};

export default ForecastPage;
