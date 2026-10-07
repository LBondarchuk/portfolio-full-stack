import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "./ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const nextThemeLabel = theme === "light" ? "Dunkles Design aktivieren" : "Helles Design aktivieren";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={nextThemeLabel}
      title={nextThemeLabel}
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary transition hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      {theme === "light" ? <FiMoon className="size-4" /> : <FiSun className="size-4" />}
    </button>
  );
};

export default ThemeToggle;
