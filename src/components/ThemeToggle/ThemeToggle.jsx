import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {isDarkMode ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
      <span>{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
    </button>
  );
};

export default ThemeToggle;