import { useState, useEffect } from 'react';
import BrandCarousel from '../components/BrandCarousel.jsx';
import { useNavigate } from 'react-router-dom';
import DubCard from '../components/DubCard.jsx';
import { t } from '../utils/translations.js';
import CarlorenLogo from '../assets/images/CarlorenLogo.svg';

const API_URL = 'https://carloren-website.onrender.com/api';

function Inicio({ language, theme }) {
  const [importantDoblajes, setImportantDoblajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchImportantDoblajes();
  }, []);

  const fetchImportantDoblajes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/doblajes?important=true`);

      if (!response.ok) {
        throw new Error('Error al cargar los datos');
      }

      const data = await response.json();

      // Sort by media priority (video > image > none), then by year DESC
      const sortedData = data.sort((a, b) => {
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

      setImportantDoblajes(sortedData);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al cargar los datos. Por favor, asegúrate de que el servidor backend esté funcionando.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section id="inicio" className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              {/* <h1 className="display-3 fw-bold mb-0">{t(language, 'home.name')}</h1> */}
              <img src={CarlorenLogo} alt="Carloren Logo" className="display-1 mt-4" style={{ width: '100%', display: 'inline', filter: theme === 'light' ? 'none' : 'invert(1)', marginBottom: '-0.2em' }} />
              <h2 className="display-7 fw-bold fst-italic mt-0 pt-0 mb-4">-Carlos Lorenzo-</h2>
              {/* <h2 className="h3 mb-4">{t(language, 'home.subtitle')}</h2> */}
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
                  src="https://www.youtube.com/embed/M7AltvUXAUA?si=qqfkPkcSZUC3RY3r"
                  title="Demo de doblaje"
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
          <h2 className="text-center mb-5">{t(language, 'home.featuredWorks')}</h2>
          <div className="row">
            {loading && (
              <div className="col-12">
                <div className="spinner-container">
                  <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">{t(language, 'common.loading')}</span>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="col-12">
                <div className="alert alert-danger" role="alert">
                  {t(language, 'common.error')}
                </div>
              </div>
            )}

            {!loading && !error && importantDoblajes.length === 0 && (
              <div className="col-12">
                <div className="empty-state">
                  <i className="bi bi-inbox"></i>
                  <p>{t(language, 'common.noFeatured')}</p>
                </div>
              </div>
            )}

            {!loading && !error && importantDoblajes.map(item => (
              <DubCard key={item.id} item={item} language={language} />
            ))}
          </div>
          {!loading && !error && importantDoblajes.length > 0 && (
            <div className="text-center mt-4">
              <button className="btn btn-info btn-lg" onClick={() => navigate('/doblajes')}>
                {t(language, 'home.moreWorks')}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Inicio;
