import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.9, rotate: 10 }}
      onClick={toggleTheme}
      className="p-2 mb-5 rounded-full shadow-md bg-white  dark:bg-gray-800 transition"
    >
      {theme === "light" ? (
        <Moon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
      ) : (
        <Sun className="w-6 h-6 text-yellow-400" />
      )}
    </motion.button>
  );
};
