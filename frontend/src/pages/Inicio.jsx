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
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-3 fw-bold mb-0">Carlos Lorenzo</h1>
              <h2 className="display-7 fw-bold fst-italic mb-4">-Carloren-</h2>
              <h2 className="h3 mb-4">Actor de voz y locutor profesional</h2>
              <p className="lead mb-4 text-justify">
                Presto mi voz y doy vida a personajes en series, películas, videojuegos y más.
                <br />
                Ya necesites un grito desgarrador, una voz cálida y amigable, o un tono serio y profesional, cuenta conmigo.
              </p>
              {/* <button className="btn btn-info btn-lg" onClick={() => document.getElementById('important-doblajes')?.scrollIntoView({ behavior: 'smooth' })}>
                Ver Trabajos
              </button> */}
            </div>
            <div className="col-lg-6  mt-4">
              <div className="hero-image">
                <iframe
                  className="rounded shadow-lg"
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/M7AltvUXAUA?si=qqfkPkcSZUC3RY3r"
                  title="Demo de doblaje"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen>
                </iframe>
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
