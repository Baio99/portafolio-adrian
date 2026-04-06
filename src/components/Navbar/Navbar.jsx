import React from 'react';
import { Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import './Navbar.css';
import { FaTimes, FaBars } from 'react-icons/fa';

const Navbar = ({ activeSection, isMenuOpen, toggleMenu }) => {
  const { t } = useTranslation();

  const navItems = [
    { id: 'home',         label: t('nav.home') },
    { id: 'about',        label: t('nav.about') },
    { id: 'projects',     label: t('nav.projects') },
    { id: 'certificates', label: t('nav.certificates') },
    { id: 'contact',      label: t('nav.contact') }
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
