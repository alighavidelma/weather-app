import { useEffect, useState } from "react";

export const useSearchHistory = (maxItems = 5) => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("weatherHistory");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const addHistory = (city: string) => {
    setHistory((prev) => {
      const updated = [
        city,
        ...prev.filter((c) => c.toLowerCase() !== city.toLowerCase()),
      ];
      const sliced = updated.slice(0, maxItems);
      localStorage.setItem("weatherHistory", JSON.stringify(sliced));
      return sliced;
    });
  };

  return { history, addHistory };
};
