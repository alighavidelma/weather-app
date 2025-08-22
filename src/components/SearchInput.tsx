import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onSearch: (city: string) => void;
}

export default ({ onSearch }: Props) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };
  return (
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
  );
};
