import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <span>Adrian Iza</span>
            <span className="logo-dot">.</span>
          </div>
          <div className="footer-links">
            <a href="#home">Inicio</a>
            <a href="#about">Sobre mí</a>
            <a href="#projects">Proyectos</a>
            <a href="#contact">Contacto</a>
          </div>
          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} Adrian Iza. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;