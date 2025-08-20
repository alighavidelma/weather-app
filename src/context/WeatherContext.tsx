import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { type WeatherContextType, type WeatherData } from "../types";

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  return (
    <WeatherContext.Provider
      value={{
        weather,
        setWeather,
        error,
        setError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within  a provider");
  }
  return context;
};
