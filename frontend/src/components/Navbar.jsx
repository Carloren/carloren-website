import { useEffect } from 'react';

function Navbar({ currentPage, setCurrentPage, theme, toggleTheme }) {
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

  const handlePageChange = (page, e) => {
    e.preventDefault();
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" id="mainNavbar">
      <div className="container">
        <a className="navbar-brand" href="#" onClick={(e) => handlePageChange('inicio', e)}>
          <strong>CARLOREN</strong>
        </a>
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
              <a 
                className={`nav-link ${currentPage === 'inicio' ? 'active' : ''}`}
                href="#"
                onClick={(e) => handlePageChange('inicio', e)}
              >
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${currentPage === 'doblajes' ? 'active' : ''}`}
                href="#"
                onClick={(e) => handlePageChange('doblajes', e)}
              >
                Doblajes
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${currentPage === 'contacto' ? 'active' : ''}`}
                href="#"
                onClick={(e) => handlePageChange('contacto', e)}
              >
                Contacto
              </a>
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
