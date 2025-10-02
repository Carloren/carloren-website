import { useState, useEffect } from 'react';
import DubCard from '../components/DubCard.jsx';

const API_URL = 'http://localhost:3000/api';

function Doblajes() {
  const [activeCategory, setActiveCategory] = useState('Series');
  const [doblajes, setDoblajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showImportantOnly, setShowImportantOnly] = useState(false);

  const categories = ['Series', 'Películas', 'Documentales', 'Locuciones', 'Audiolibros', 'Videojuegos'];

  useEffect(() => {
    fetchDoblajes(activeCategory, showImportantOnly);
  }, [activeCategory, showImportantOnly]);

  const fetchDoblajes = async (category, importantOnly) => {
    setLoading(true);
    setError(null);
    
    try {
      let url = `${API_URL}/doblajes?category=${encodeURIComponent(category)}`;
      if (importantOnly) {
        url += '&important=true';
      }
      const response = await fetch(url);
      
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
        <h2 className="text-center mb-5">Mi Trabajo</h2>
        
        {/* Category Tabs */}
        <ul className="nav nav-pills justify-content-center mb-4">
          {categories.map(category => (
            <li key={category} className="nav-item">
              <button
                className={`nav-link ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>

        {/* Destacados/Todos Switch */}
        <div className="d-flex justify-content-center mb-5">
          <div className="btn-group" role="group" aria-label="Filter switch">
            <button
              type="button"
              className={`btn ${showImportantOnly ? 'btn-info' : 'btn-outline-info'}`}
              onClick={() => setShowImportantOnly(true)}
            >
              Destacados
            </button>
            <button
              type="button"
              className={`btn ${!showImportantOnly ? 'btn-info' : 'btn-outline-info'}`}
              onClick={() => setShowImportantOnly(false)}
            >
              Todos
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="row">
          {loading && (
            <div className="col-12">
              <div className="spinner-container">
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            </div>
          )}
          
          {error && (
            <div className="col-12">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </div>
          )}
          
          {!loading && !error && doblajes.length === 0 && (
            <div className="col-12">
              <div className="empty-state">
                <i className="bi bi-inbox"></i>
                <p>No hay trabajos disponibles en esta categoría.</p>
              </div>
            </div>
          )}
          
          {!loading && !error && doblajes.map(item => (
            <DubCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Doblajes;
