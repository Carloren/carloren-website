import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DubCard from '../components/DubCard.jsx';

const API_URL = 'http://localhost:3000/api';

function Inicio() {
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
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-6">
              <h1 className="display-3 fw-bold mb-4">Carlos Lorenzo</h1>
              <h2 className="h3 mb-4">Actor de Doblaje Profesional</h2>
              <p className="lead mb-4">
                Dando voz a personajes inolvidables en series, películas, documentales y más. 
                Con años de experiencia en la industria del doblaje en español.
              </p>
              <button className="btn btn-info btn-lg" onClick={() => document.getElementById('important-doblajes')?.scrollIntoView({ behavior: 'smooth' })}>
                Ver Trabajos
              </button>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
                <i className="bi bi-mic-fill display-1"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="important-doblajes" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Trabajos Destacados</h2>
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
            
            {!loading && !error && importantDoblajes.length === 0 && (
              <div className="col-12">
                <div className="empty-state">
                  <i className="bi bi-inbox"></i>
                  <p>No hay trabajos destacados disponibles.</p>
                </div>
              </div>
            )}
            
            {!loading && !error && importantDoblajes.map(item => (
              <DubCard key={item.id} item={item} />
            ))}
          </div>
          {!loading && !error && importantDoblajes.length > 0 && (
            <div className="text-center mt-4">
              <button className="btn btn-info btn-lg" onClick={() => navigate('/doblajes')}>
                Más trabajos
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Inicio;
