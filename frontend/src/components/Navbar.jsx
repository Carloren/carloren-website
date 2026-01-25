import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleNavLinkClick = () => {
    const navbarCollapse = navbarCollapseRef.current;
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
      bsCollapse.hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" id="mainNavbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <strong>CARLOREN</strong>
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
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/doblajes') ? 'active' : ''}`}
                to="/doblajes"
                onClick={handleNavLinkClick}
              >
                Doblajes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/contacto') ? 'active' : ''}`}
                to="/contacto"
                onClick={handleNavLinkClick}
              >
                Contacto
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={toggleLanguage}
                aria-label="Change language"
              >
                {language === 'es' ? (
                  <img src="https://cdn-icons-png.flaticon.com/128/197/197593.png" alt="Spanish" style={{ width: '20px', height: '20px' }} />
                ) : (
                  <img src="https://cdn-icons-png.flaticon.com/128/197/197374.png" alt="English" style={{ width: '20px', height: '20px' }} />
                )}
              </button>
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
