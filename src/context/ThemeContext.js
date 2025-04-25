import React, { createContext, useState, useEffect } from 'react';
export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Por defecto modo oscuro (true)

  useEffect(() => {
    // Comprobar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Si no hay tema guardado, establecer modo oscuro por defecto
    if (!savedTheme) {
      localStorage.setItem('theme', 'dark');
    } else {
      // Si hay un tema guardado, usarlo (pero manteniendo oscuro como predeterminado)
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};