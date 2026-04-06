import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <span>Adrian Iza</span>
            <span className="logo-dot">.</span>
          </div>
          <div className="footer-links">
            <a href="#home">{t('footer.home')}</a>
            <a href="#about">{t('footer.about')}</a>
            <a href="#projects">{t('footer.projects')}</a>
            <a href="#contact">{t('footer.contact')}</a>
          </div>
          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} Adrian Iza. {t('footer.rights')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
