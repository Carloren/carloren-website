import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Inicio from './pages/Inicio.jsx';
import Doblajes from './pages/Doblajes.jsx';
import Contacto from './pages/Contacto.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'es';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'es' ? 'en' : 'es');
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          language={language}
          toggleLanguage={toggleLanguage}
        />
        <Routes>
          <Route path="/" element={<Inicio language={language} theme={theme} />} />
          <Route path="/doblajes" element={<Doblajes language={language} />} />
          <Route path="/contacto" element={<Contacto language={language} />} />
        </Routes>
        <Footer language={language} theme={theme} />
        <ScrollToTop language={language} />
      </div>
    </Router>
  );
}

export default App;
