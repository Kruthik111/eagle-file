import React from "react";

export const ThemeContext = React.createContext();
export default function ThemeProvider() {
  return <ThemeContext.Provider></ThemeContext.Provider>;
}
