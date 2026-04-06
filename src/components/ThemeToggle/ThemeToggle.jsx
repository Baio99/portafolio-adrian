import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { FaMoon, FaSun } from 'react-icons/fa';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {isDarkMode ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
      <span>{isDarkMode ? t('theme.light') : t('theme.dark')}</span>
    </button>
  );
};

export default ThemeToggle;
