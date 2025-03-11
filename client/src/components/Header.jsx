import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [rotated, setRotated] = useState(false);

  const handleToggle = () => {
    setRotated(!rotated);
    toggleTheme();
  };

  return (
    <header className="p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">RapidTrace</h1>
      <button
        onClick={handleToggle}
        className="p-2 bg-transparent transition-transform duration-500"
      >
        <span
          className={`inline-block transition-transform duration-500 ${
            rotated ? "rotate-180" : "rotate-0"
          }`}
        >
          {theme === "dark" ? (
            <Sun className="text-yellow-500 w-6 h-6" />
          ) : (
            <Moon className="text-gray-500 w-6 h-6" />
          )}
        </span>
      </button>
    </header>
  );
}
