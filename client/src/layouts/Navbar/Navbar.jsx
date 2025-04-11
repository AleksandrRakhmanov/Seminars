import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userIcon from './icons/user_icon.png';
import userIcon_2 from './icons/user_icon_2.png';
import burger_icon from './icons/burger_icon.png';

import styles from './navbar.module.css'; // Импортируем стили

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className={styles.navbarContainer}>
        <div>
          <img
            className={styles.burgerIcon}
            src={burger_icon}
            alt="burger_icon"
            onClick={toggleMenu}
          />
        </div>
        <div>
          <Link to="/auth">
            <img className={styles.userIcon} src={userIcon_2} alt="User Icon" />
          </Link>
        </div>
      </div>

      {/* Боковое меню */}
      <div
        className={`${styles.sideMenu} ${isMenuOpen ? styles.open : ''}`}
        ref={menuRef}
      >
        <ul className={styles.sideMenuList}>
          <li onClick={toggleMenu}>
            <Link to="/">Главная</Link>
          </li>
          <li onClick={toggleMenu}>
            <Link to="/yourseminars">Мои семинары</Link>
          </li>
          <li onClick={toggleMenu}>
            <Link to="/seminars">Семинары</Link>
          </li>
          {/* <li onClick={toggleMenu}>
            <Link to="/favorites">Избранное</Link>
          </li> */}
          <li onClick={toggleMenu}>
            <Link to="/about">О нас</Link>
          </li>
        </ul>
      </div>

      {/* Затемнение фона */}
      {isMenuOpen && <div className={styles.overlay} />}
    </div>
  );
};

export default Navbar;
