function Contacto() {
  return (
    <section id="contacto" className="py-5 min-vh-100" style={{ marginTop: '56px' }}>
      <div className="container">
        <h2 className="text-center mb-5">Contacto</h2>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h5 className="card-title mb-4">¿Interesado en trabajar conmigo?</h5>
                <p className="card-text mb-4">
                  Estoy disponible para proyectos de doblaje, locución, audiolibros y más. 
                  No dudes en contactarme para discutir tu próximo proyecto.
                </p>
                <div className="contact-info">
                  <div className="mb-3">
                    <i className="bi bi-envelope-fill me-2"></i>
                    <a href="mailto:carlos@carloren.com">carloren@gmail.com</a>
                  </div>
                  <div className="mb-3">
                    <i className="bi bi-telephone-fill me-2"></i>
                    <span>+34 676 310 141</span>
                  </div>
                  <div className="mb-3">
                    <i className="bi bi-geo-alt-fill me-2"></i>
                    <span>Madrid, España</span>
                  </div>
                </div>
                <div className="social-links mt-4">
                  <a href="https://x.com/Carloren96" className="btn btn-outline-info me-2" target="_blank">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="https://www.instagram.com/carloren96/" className="btn btn-outline-info me-2" target="_blank">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/carloren/" className="btn btn-outline-info" target="_blank">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;
