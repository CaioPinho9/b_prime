import { darkTheme, lightTheme, Theme } from "bold-ui";
import { createContext, useContext, useEffect, useState } from "react";

const dark = "dark";
const light = "light";

const setLocalStorageTheme = (theme: Theme) => {
  if (localStorage) {
    localStorage.setItem("theme", theme === darkTheme ? dark : light);
  }
};

const getLocalStorageTheme = () => {
  if (localStorage) {
    return localStorage.getItem("theme");
  }
  return dark;
};

export const useChangeTheme = () => {
  const [currentTheme, setCurrentTheme] = useState(darkTheme);

  useEffect(() => {
    const storedTheme = getLocalStorageTheme();

    const theme = storedTheme === light ? lightTheme : darkTheme;
    setCurrentTheme(theme);
    setLocalStorageTheme(theme);
  }, []);

  const changeTheme = () => {
    const theme = currentTheme === lightTheme ? darkTheme : lightTheme;

    setCurrentTheme(theme);
    setLocalStorageTheme(theme);
    return null;
  };

  return [currentTheme, changeTheme] as const;
};

export const ThemeContext = createContext({
  changeTheme: () => null,
});

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
