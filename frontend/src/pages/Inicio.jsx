import { useState, useEffect } from 'react';
import BrandCarousel from '../components/BrandCarousel.jsx';
import { useNavigate } from 'react-router-dom';
import DubCard from '../components/DubCard.jsx';
import { t } from '../utils/translations.js';
import CarlorenLogo from '../assets/images/CarlorenLogo.svg';
import doblajesData from '../data/doblajes.json';

// Sort by media priority (video > image > none), then by year DESC
const sortImportantDoblajes = (data) => {
  return [...data].sort((a, b) => {
    // Define priority: video=3, image=2, none=1
    const getPriority = (item) => {
      if (item.video && item.video.trim() !== '') return 3;
      if (item.image && item.image.trim() !== '') return 2;
      return 1;
    };

    const priorityA = getPriority(a);
    const priorityB = getPriority(b);

    // Sort by priority first (descending)
    if (priorityA !== priorityB) {
      return priorityB - priorityA;
    }

    // If same priority, sort by year (descending)
    // If same year, sort by main character or not
    if (a.year === b.year) {
      const aHasChar = a.mainCharacter && a.mainCharacter.trim() !== '';
      const bHasChar = b.mainCharacter && b.mainCharacter.trim() !== '';
      if (aHasChar !== bHasChar) {
        return bHasChar ? 1 : -1;
      }
      return aHasChar ? a.mainCharacter.localeCompare(b.mainCharacter) : 0;
    }
    return b.year - a.year;
  });
};

const importantDoblajesData = sortImportantDoblajes(doblajesData.filter(item => item.important === 1));

function Inicio({ language, theme }) {
  const [importantDoblajes] = useState(importantDoblajesData);
  const navigate = useNavigate();

  // Set document title
  useEffect(() => {
    document.title = t(language, 'pageTitle.home');
  }, [language]);

  return (
    <main>
      <section id="inicio" className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <header>
                <h1 className="visually-hidden">Carlos Lorenzo - Carloren - Actor de Voz Profesional</h1>
                <img src={CarlorenLogo} alt="Carloren Logo" className="display-1 mt-4" style={{ width: '100%', display: 'inline', filter: theme === 'light' ? 'none' : 'invert(1)', marginBottom: '-0.2em' }} />
                <h2 className="display-7 fw-bold fst-italic mt-0 pt-0 mb-4">-Carlos Lorenzo-</h2>
              </header>
              <p className="lead mb-4 text-justify">
                {t(language, 'home.description').split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < t(language, 'home.description').split('\n').length - 1 && <><br /></>}
                  </span>
                ))}
              </p>
            </div>
            <div className="col-lg-6  mt-4">
              <div className="hero-image">
                <iframe
                  className="rounded shadow-lg w-100"
                  style={{ aspectRatio: '16/9' }}
                  src="https://www.youtube.com/embed/yG1fxcG-2FM"
                  title="Demo de doblaje - Carlos Lorenzo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen>
                </iframe>
              </div>
            </div>
          </div>
        </div>
        {/* Brand carousel below hero section */}
        <BrandCarousel />

      </section>

      <section id="important-doblajes" className="py-5">
        <div className="container">
          <header>
            <h2 className="text-center mb-5">{t(language, 'home.featuredWorks')}</h2>
          </header>
          <div className="row">
            {importantDoblajes.length === 0 && (
              <div className="col-12">
                <div className="empty-state">
                  <i className="bi bi-inbox" aria-hidden="true"></i>
                  <p>{t(language, 'common.noFeatured')}</p>
                </div>
              </div>
            )}

            {importantDoblajes.map(item => (
              <DubCard key={item.id} item={item} language={language} />
            ))}
          </div>
          {importantDoblajes.length > 0 && (
            <div className="text-center mt-4">
              <button className="btn btn-info btn-lg" onClick={() => navigate('/doblajes')} aria-label={`${t(language, 'home.moreWorks')} - Ver todos los doblajes de Carlos Lorenzo`}>
                {t(language, 'home.moreWorks')}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Inicio;
