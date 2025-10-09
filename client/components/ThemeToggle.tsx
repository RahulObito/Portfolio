import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // default: dark
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const initial = saved ?? "dark";
    setTheme(initial);
    if (typeof document !== "undefined") {
      if (initial === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    if (next === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex items-center gap-2 p-2 rounded-md hover:bg-white/5 transition"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
