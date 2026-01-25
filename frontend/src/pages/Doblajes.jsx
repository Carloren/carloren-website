import { useState, useEffect } from 'react';
import DubCard from '../components/DubCard.jsx';
import { t } from '../utils/translations.js';

const API_URL = 'https://carloren-website.onrender.com/api';

function Doblajes({ language }) {
  const [activeCategory, setActiveCategory] = useState('Series');
  const [doblajes, setDoblajes] = useState([]);
  const [contador, setContador] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortByImportant, setSortByImportant] = useState(true);

  const categories = ['Series', 'Películas', 'Documentales', 'Locuciones', 'Audiolibros', 'Videojuegos'];

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (count <= doblajes.length) {
        setContador(count);
        count++;
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [doblajes]);

  useEffect(() => {
    fetchDoblajes(activeCategory, sortByImportant);
  }, [activeCategory, sortByImportant]);

  const fetchDoblajes = async (category, importantFirst) => {
    setLoading(true);
    setError(null);

    try {
      let url = `${API_URL}/doblajes?category=${encodeURIComponent(category)}`;
      // if (importantFirst) {
      //   url += '&important=true';
      // }
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error al cargar los datos');
      }

      const data = await response.json();

      // Sort by media priority (video > image > none), then by year DESC
      const sortedData = data.sort((a, b) => {
        // Define priority: video=5, image=4, important=3, named character=2, none=1
        const getPriority = (item) => {
          if (item.video && item.video.trim() !== '') return 5;
          if (item.important == 1) return 4;
          if (item.image && item.image.trim() !== '') return 3;
          if (item.mainCharacter && item.mainCharacter.trim() !== '') return 2;
          return 1;
        };

        const priorityA = getPriority(a);
        const priorityB = getPriority(b);

        // Sort by priority first (descending)
        if (priorityA !== priorityB && importantFirst) {
          return priorityB - priorityA;
        }

        // If same priority, sort by year (descending)
        return b.year - a.year;
      });

      setDoblajes(sortedData);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al cargar los datos. Por favor, asegúrate de que el servidor backend esté funcionando.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="doblajes" className="py-5" style={{ marginTop: '56px' }}>
      <div className="container">
        <h2 className="text-center">{t(language, 'doblajes.title')}</h2>
        <h4 className="text-center mb-5"><a className="link-info text-decoration-none" href="https://www.eldoblaje.com/datos/FichaActorDoblaje.asp?id=180068&Orden=A" target="_blank">{t(language, 'doblajes.subtitle')}</a></h4>

        {/* Category Tabs */}
        <ul className="nav nav-pills justify-content-center mb-4">
          {categories.map(category => (
            <li key={category} className="nav-item">
              <button
                className={`nav-link ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {t(language, `doblajes.categories.${category}`)}
              </button>
            </li>
          ))}
        </ul>
        <p className="text-center mb-4">{t(language, 'doblajes.count')} <strong>{contador}</strong> {t(language, `doblajes.countSuffix.${activeCategory}`)}</p>

        {/* Destacados/Todos Switch */}
        <div className="d-flex justify-content-center mb-5">
          <p className="me-3 align-self-center mb-0">{t(language, 'doblajes.sortBy')}</p>
          <div className="btn-group" role="group" aria-label="Filter switch">
            <button
              type="button"
              className={`btn ${sortByImportant ? 'btn-info' : 'btn-outline-info'}`}
              onClick={() => setSortByImportant(true)}
            >
              {t(language, 'doblajes.sortOptions.important')}
            </button>
            <button
              type="button"
              className={`btn ${!sortByImportant ? 'btn-info' : 'btn-outline-info'}`}
              onClick={() => setSortByImportant(false)}
            >
              {t(language, 'doblajes.sortOptions.year')}
            </button>
          </div>
        </div>

        {/* Content */}
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

          {!loading && !error && doblajes.length === 0 && (
            <div className="col-12">
              <div className="empty-state">
                <i className="bi bi-inbox"></i>
                <p>{t(language, 'common.noResults')}</p>
              </div>
            </div>
          )}

          {!loading && !error && doblajes.map(item => (
            <DubCard key={item.id} item={item} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Doblajes;
