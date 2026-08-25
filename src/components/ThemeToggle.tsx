import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-stroke bg-surface text-fg transition-colors hover:border-stroke-strong hover:bg-surface-hover"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.95 }}
      data-cursor
      data-cursor-label={isDark ? "Light" : "Dark"}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {isDark ? <Sun size={16} className="text-accent-light" /> : <Moon size={16} className="text-accent" />}
      </motion.span>
    </motion.button>
  );
}
