import { useState, useEffect } from 'react';
import DubCard from '../components/DubCard.jsx';
import { t } from '../utils/translations.js';
import { updateMetaTags } from '../utils/seo.js';
import doblajesData from '../data/doblajes.json';

function Doblajes({ language }) {
  const [activeCategory, setActiveCategory] = useState('Series');
  const [doblajes, setDoblajes] = useState([]);
  const [contador, setContador] = useState(0);
  const [sortByImportant, setSortByImportant] = useState(true);

  const categories = ['Series', 'Películas', 'Documentales', 'Locuciones', 'Audiolibros', 'Videojuegos'];

  // Set document title and per-page meta tags
  useEffect(() => {
    updateMetaTags({
      title: t(language, 'pageTitle.doblajes'),
      description: t(language, 'meta.doblajes.description'),
      path: '/doblajes',
    });
  }, [language]);

  useEffect(() => {
    // Function to extract base title (removing season/part indicators)
    const getBaseTitle = (title) => {
      // Remove common season/part patterns like T1, T2, S1, S2, Season X, Part X, etc.
      return title.replace(/\s+(T\d+|S\d+|Season\s+\d+|Part\s+\d+|Temporada\s+\d+|Parte\s+\d+)$/i, '').trim();
    };

    // Count unique base titles
    const uniqueTitles = new Set();
    doblajes.forEach(item => {
      const baseTitle = getBaseTitle(item.title);
      uniqueTitles.add(baseTitle);
    });

    let count = 0;
    let length = uniqueTitles.size;

    // Calculate interval to make animation last exactly 2 seconds
    const animationDuration = 1500; // 2 seconds
    const intervalTime = length > 0 ? animationDuration / length : 50;

    const interval = setInterval(() => {
      if (count <= length) {
        setContador(count);
        count++;
      } else {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [doblajes]);

  useEffect(() => {
    const filtered = doblajesData.filter(item => item.category === activeCategory);
    setDoblajes(sortDoblajes(filtered, sortByImportant));
  }, [activeCategory, sortByImportant]);

  // Sorting function extracted for reuse
  const sortDoblajes = (data, importantFirst) => {
    return [...data].sort((a, b) => {
      // Define priority: video=5, important=4, image=3, named character=2, none=1
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

  return (
    <main>
      <section id="doblajes" className="py-5" style={{ marginTop: '56px' }}>
        <div className="container">
          <header>
            <h1 className="text-center">{t(language, 'doblajes.title')}</h1>
            <p className="text-center mb-5 h4"><a className="link-info text-decoration-none" href="https://www.eldoblaje.com/datos/FichaActorDoblaje.asp?id=180068&Orden=A" target="_blank" rel="noopener">{t(language, 'doblajes.subtitle')}</a></p>
          </header>

          {/* Category Navigation */}
          <nav className="mb-4" aria-label="Categorías de trabajos">
            <ul className="nav nav-pills justify-content-center">
              {categories.map(category => (
                <li key={category} className="nav-item">
                  <button
                    className={`nav-link ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={activeCategory === category}
                  >
                    {t(language, `doblajes.categories.${category}`)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          <p className="text-center mb-4">{t(language, 'doblajes.count')} <strong>{contador}</strong> {t(language, `doblajes.countSuffix.${activeCategory}`)}</p>

          {/* Sort Controls */}
          <div className="d-flex justify-content-center mb-5">
            <p className="me-3 align-self-center mb-0">{t(language, 'doblajes.sortBy')}</p>
            <div className="btn-group" role="group" aria-label="Opciones de ordenamiento">
              <button
                type="button"
                className={`btn ${sortByImportant ? 'btn-info' : 'btn-outline-info'}`}
                onClick={() => setSortByImportant(true)}
                aria-pressed={sortByImportant}
              >
                {t(language, 'doblajes.sortOptions.important')}
              </button>
              <button
                type="button"
                className={`btn ${!sortByImportant ? 'btn-info' : 'btn-outline-info'}`}
                onClick={() => setSortByImportant(false)}
                aria-pressed={!sortByImportant}
              >
                {t(language, 'doblajes.sortOptions.year')}
              </button>
            </div>
          </div>

          {/* Works Grid */}
          <div className="row">
            {doblajes.length === 0 && (
              <div className="col-12">
                <div className="empty-state">
                  <i className="bi bi-inbox" aria-hidden="true"></i>
                  <p>{t(language, 'common.noResults')}</p>
                </div>
              </div>
            )}

            {doblajes.map(item => (
              <DubCard key={item.id} item={item} language={language} />
            ))}
          </div>

          {/* Full portfolio index across all categories. Kept visible to
              screen readers (and search engine crawlers) even though only
              the active category tab is shown above — the tabs otherwise
              hide every other category's work from anyone who can't click. */}
          <section className="visually-hidden">
            <h2>{t(language, 'doblajes.fullListTitle')}</h2>
            <ul>
              {doblajesData.map(item => (
                <li key={`full-${item.id}`}>
                  {item.title} — {t(language, `doblajes.categories.${item.category}`)} ({item.year})
                  {item.mainCharacter ? ` — ${item.mainCharacter}` : ''}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}

export default Doblajes;
