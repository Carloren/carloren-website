import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api';

function Inicio() {
  const [importantDoblajes, setImportantDoblajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setImportantDoblajes(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al cargar los datos. Por favor, asegúrate de que el servidor backend esté funcionando.');
    } finally {
      setLoading(false);
    }
  };

  const escapeHtml = (text) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text ? text.replace(/[&<>"']/g, m => map[m]) : '';
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
              <button className="btn btn-info btn-lg" onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
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
              <div key={item.id} className="col-lg-4 col-md-6 work-card">
                <div className="card">
                  <div className="card-img-top">
                    <i className="bi bi-film"></i>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">
                      <strong>Personaje:</strong> {item.mainCharacter}<br />
                      <span className="badge bg-info">{item.year}</span>
                      <span className="badge bg-secondary ms-1">{item.category}</span>
                    </p>
                    {item.video && (
                      <a href={item.video} className="btn btn-sm btn-outline-info" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-play-circle"></i> Ver Video
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Inicio;
