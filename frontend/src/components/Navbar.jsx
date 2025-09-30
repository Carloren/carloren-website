import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ theme, toggleTheme }) {
  const location = useLocation();

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

  const isActive = (path) => location.pathname === path;

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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                to="/"
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/doblajes') ? 'active' : ''}`}
                to="/doblajes"
              >
                Doblajes
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/contacto') ? 'active' : ''}`}
                to="/contacto"
              >
                Contacto
              </Link>
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
