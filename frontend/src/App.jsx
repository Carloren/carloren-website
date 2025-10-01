import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Inicio from './components/Inicio.jsx';
import Doblajes from './components/Doblajes.jsx';
import Contacto from './components/Contacto.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="App">
        <Navbar 
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/doblajes" element={<Doblajes />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
