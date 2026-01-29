import { useEffect } from "react";
import { useHass } from "./useHass.js";

/**
 * Hook to synchronize the dashboard's dark mode with Home Assistant's theme state.
 * It toggles the 'dark' class on the document root element.
 */
export function useDarkMode(): void {
  const hass = useHass();

  // Access darkMode from themes. We cast to any as the HomeAssistant type
  // currently defines themes as unknown.
  const darkMode =
    (hass.themes as { darkMode?: boolean } | undefined)?.darkMode ?? false;

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);
}
