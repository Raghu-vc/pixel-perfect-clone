import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "radiant";
export const THEMES: Theme[] = ["light", "dark", "radiant"];
const KEY = "workswatch-theme";

/** Inline script run before paint so the saved theme applies without a flash. */
export const themeInitScript = `try{var t=localStorage.getItem("${KEY}");if(t==="dark"||t==="radiant")document.documentElement.classList.add(t)}catch(e){}`;

export function applyTheme(t: Theme) {
  const el = document.documentElement;
  el.classList.remove("dark", "radiant");
  if (t !== "light") el.classList.add(t);
  localStorage.setItem(KEY, t);
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => {
    const saved = localStorage.getItem(KEY) as Theme | null;
    if (saved && THEMES.includes(saved)) setTheme(saved);
  }, []);
  return {
    theme,
    setTheme: (t: Theme) => {
      applyTheme(t);
      setTheme(t);
    },
  };
}
