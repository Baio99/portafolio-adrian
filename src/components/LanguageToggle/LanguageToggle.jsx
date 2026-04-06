import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import './LanguageToggle.css';

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';

  const toggle = () => {
    const next = isSpanish ? 'en' : 'es';
    i18n.changeLanguage(next);
    localStorage.setItem('language', next);
  };

  return (
    <motion.button
      className="language-toggle"
      onClick={toggle}
      whileTap={{ scale: 0.93 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      aria-label="Switch language"
      title={isSpanish ? 'Switch to English' : 'Cambiar a Español'}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={i18n.language}
          className="lang-active"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18 }}
        >
          {isSpanish ? 'ES' : 'EN'}
        </motion.span>
      </AnimatePresence>

      <span className="lang-divider">/</span>

      <span className="lang-inactive">
        {isSpanish ? 'EN' : 'ES'}
      </span>
    </motion.button>
  );
};

export default LanguageToggle;
