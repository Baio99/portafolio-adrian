import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Sobre mí' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'contact', label: 'Contacto' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Detectar scroll para efecto de reducción
      setIsScrolled(window.scrollY > 20);

      // Detectar sección activa con scrollPosition ajustado
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 80; // Ajustado para mejor detección

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

  // Variants para animaciones secuenciales
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  // Efecto de pulso para el punto decorativo
  const pulseDot = {
    animate: {
      scale: [1, 1.15, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
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
          <Link
            to="home"
            smooth={true}
            duration={500}
            className="logo-link"
          >
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
                  offset={-70}
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
                        ease: [0.43, 0.13, 0.23, 0.96] // Curva Bezier personalizada
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
            href="/CV.pdf"
            download="AI_CV.pdf"  // Nombre sugerido del archivo descargado
            className="cv-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Currículum
          </motion.a>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;