import { useState, useEffect } from 'react';
import DubCard from './DubCard.jsx';

const API_URL = 'http://localhost:3000/api';

function Doblajes() {
  const [activeCategory, setActiveCategory] = useState('Series');
  const [doblajes, setDoblajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['Series', 'Películas', 'Documentales', 'Locuciones', 'Audiolibros', 'Videojuegos'];

  useEffect(() => {
    fetchDoblajes(activeCategory);
  }, [activeCategory]);

  const fetchDoblajes = async (category) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/doblajes?category=${encodeURIComponent(category)}`);
      
      if (!response.ok) {
        throw new Error('Error al cargar los datos');
      }

      const data = await response.json();
      setDoblajes(data);
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
        <ul className="nav nav-pills justify-content-center mb-5">
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
