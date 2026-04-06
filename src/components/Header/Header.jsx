import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Header.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import LanguageToggle from '../LanguageToggle/LanguageToggle';

const Header = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'home',         label: t('nav.home') },
    { id: 'about',        label: t('nav.about') },
    { id: 'projects',     label: t('nav.projects') },
    { id: 'certificates', label: t('nav.certificates') },
    { id: 'contact',      label: t('nav.contact') }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'projects', 'certificates', 'contact'];
      const scrollPosition = window.scrollY + 80;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Link to="home" smooth={true} duration={500} className="logo-link">
            <span className="logo-text">
              Adrian<span className="logo-highlight">Iza</span>
            </span>
          </Link>
        </motion.div>

        <motion.nav
          className="desktop-nav"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          <ul className="nav-list">
            {navItems.map((item) => (
              <motion.li
                key={item.id}
                className="nav-item"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.id}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-75}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span
                      className="nav-underline"
                      layoutId="nav-underline"
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                        ease: [0.43, 0.13, 0.23, 0.96]
                      }}
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        <div className="header-right">
          <motion.a
            href="/portafolio-adrian/IngIzaCV2026.pdf"
            download="IngAdrianIza_CV.pdf"
            className="cv-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {t('header.cv')}
          </motion.a>

          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
