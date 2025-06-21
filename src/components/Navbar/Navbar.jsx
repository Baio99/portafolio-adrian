import React from 'react';
import { Link } from 'react-scroll';
import './Navbar.css';
import { FaTimes, FaBars } from 'react-icons/fa';

const Navbar = ({ activeSection, isMenuOpen, toggleMenu }) => {
  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Sobre mí' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'certificates', label: 'Certificados' },
    { id: 'contact', label: 'Contacto' }
  ];

  return (
    <>
      <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.id} className="nav-item">
              <Link
                to={item.id}
                spy={true}
                smooth={true}
                duration={500}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => toggleMenu()}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button className="mobile-menu-button" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </>
  );
};

export default Navbar;