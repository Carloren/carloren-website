import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { t } from '../utils/translations.js';
import TitleLogo from '../assets/images/TitleLogo.svg';

function Navbar({ theme, toggleTheme, language, toggleLanguage }) {
  const location = useLocation();
  const navbarCollapseRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('mainNavbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        } else {
          navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,.1)';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbarCollapse = navbarCollapseRef.current;
      const navbarToggler = document.querySelector('.navbar-toggler');

      if (navbarCollapse &&
        navbarCollapse.classList.contains('show') &&
        !navbarCollapse.contains(event.target) &&
        !navbarToggler.contains(event.target)) {
        // Collapse the navbar
        const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
        bsCollapse.hide();
      }

      // Close dropdown when clicking outside
      const dropdown = document.querySelector('.dropdown-menu.show');
      if (dropdown && !dropdown.contains(event.target) && !dropdown.previousElementSibling?.contains(event.target)) {
        dropdown.classList.remove('show');
        const toggle = dropdown.previousElementSibling;
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Initialize Bootstrap components after mount
  useEffect(() => {
    // Ensure Bootstrap is loaded before initializing
    const initializeBootstrap = () => {
      if (window.bootstrap) {
        // Initialize any dropdowns that aren't automatically initialized
        const dropdowns = document.querySelectorAll('[data-bs-toggle="dropdown"]');
        dropdowns.forEach(dropdown => {
          if (!dropdown.getAttribute('data-bs-initialized')) {
            new window.bootstrap.Dropdown(dropdown);
            dropdown.setAttribute('data-bs-initialized', 'true');
          }
        });
      }
    };

    // Try to initialize immediately, or wait for Bootstrap to load
    if (window.bootstrap) {
      initializeBootstrap();
    } else {
      const checkBootstrap = setInterval(() => {
        if (window.bootstrap) {
          clearInterval(checkBootstrap);
          initializeBootstrap();
        }
      }, 100);

      // Cleanup interval after 5 seconds
      setTimeout(() => clearInterval(checkBootstrap), 5000);
    }
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleNavLinkClick = () => {
    const navbarCollapse = navbarCollapseRef.current;
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
      bsCollapse.hide();
    }
  };

  const handleDropdownToggle = (event) => {
    event.preventDefault();
    const dropdown = event.currentTarget;
    const dropdownMenu = dropdown.nextElementSibling;

    if (dropdownMenu) {
      const isOpen = dropdownMenu.classList.contains('show');

      // Close all other dropdowns first
      document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
        if (menu !== dropdownMenu) {
          menu.classList.remove('show');
          const toggle = menu.previousElementSibling;
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current dropdown
      if (isOpen) {
        dropdownMenu.classList.remove('show');
        dropdown.setAttribute('aria-expanded', 'false');
      } else {
        dropdownMenu.classList.add('show');
        dropdown.setAttribute('aria-expanded', 'true');
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" id="mainNavbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            className='navbar-logo'
            src={TitleLogo}
            alt="Carloren"
          />
          {/* <strong>CARLOREN</strong> */}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav" ref={navbarCollapseRef}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                to="/"
                onClick={handleNavLinkClick}
              >
                {t(language, 'nav.inicio')}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/doblajes') ? 'active' : ''}`}
                to="/doblajes"
                onClick={handleNavLinkClick}
              >
                {t(language, 'nav.doblajes')}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/contacto') ? 'active' : ''}`}
                to="/contacto"
                onClick={handleNavLinkClick}
              >
                {t(language, 'nav.contacto')}
              </Link>
            </li>
            <li className="nav-item dropdown">
              <button
                className="btn btn-link nav-link dropdown-toggle"
                id="languageDropdown"
                onClick={handleDropdownToggle}
                aria-expanded="false"
                aria-label="Change language"
                type="button"
              >
                {language === 'es' ? (
                  <>
                    <img src="https://cdn-icons-png.flaticon.com/128/197/197593.png" alt="Spanish" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                    ES
                  </>
                ) : (
                  <>
                    <img src="https://cdn-icons-png.flaticon.com/128/197/197374.png" alt="English" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                    EN
                  </>
                )}
              </button>
              <ul className="dropdown-menu" aria-labelledby="languageDropdown" data-bs-theme={theme}>
                <li>
                  <button
                    className={`dropdown-item ${language === 'es' ? 'active' : ''}`}
                    onClick={() => {
                      if (language !== 'es') toggleLanguage();
                      handleNavLinkClick();
                    }}
                  >
                    <img src="https://cdn-icons-png.flaticon.com/128/197/197593.png" alt="Spanish" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                    Español
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${language === 'en' ? 'active' : ''}`}
                    onClick={() => {
                      if (language !== 'en') toggleLanguage();
                      handleNavLinkClick();
                    }}
                  >
                    <img src="https://cdn-icons-png.flaticon.com/128/197/197374.png" alt="English" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                    English
                  </button>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                <i className={`bi ${theme === 'dark' ? 'bi-moon-fill' : 'bi-sun-fill'}`}></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
