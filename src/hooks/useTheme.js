import { useState, useEffect } from "react";

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);

    // Update Prism theme
    const lightTheme = document.getElementById("prism-theme-light");
    const darkTheme = document.getElementById("prism-theme-dark");

    if (lightTheme && darkTheme) {
      lightTheme.disabled = isDarkMode;
      darkTheme.disabled = !isDarkMode;
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return {
    isDarkMode,
    toggleTheme,
  };
};
