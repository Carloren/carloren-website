import { useEffect } from 'react';
import { t } from '../utils/translations.js';

function Contacto({ language }) {
  // Set document title
  useEffect(() => {
    document.title = t(language, 'pageTitle.contacto');
  }, [language]);

  return (
    <main>
      <section id="contacto" className="py-5" style={{ marginTop: '56px' }}>
        <div className="container">
          <header>
            <h1 className="text-center mb-5">{t(language, 'contact.title')}</h1>
          </header>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <article className="card shadow-sm" style={{transform: "translateY(0px)"}}>
                <div className="card-body p-4">
                  <header>
                    <h2 className="card-title mb-4 h5">{t(language, 'contact.cardTitle')}</h2>
                  </header>
                  <p className="card-text mb-4">
                    {t(language, 'contact.description')}
                  </p>
                  <address className="contact-info">
                    <div className="mb-3">
                      <i className="bi bi-envelope-fill me-2" aria-hidden="true"></i>
                      <a href="mailto:carloren.1996@gmail.com" target="_blank" rel="noopener">carloren.1996@gmail.com</a>
                    </div>
                    <div className="mb-3">
                      <i className="bi bi-telephone-fill me-2" aria-hidden="true"></i>
                      <a className='bi bi-whatsapp text-success' href="https://wa.link/sddaj4" target="_blank" rel="noopener" aria-label="Contactar por WhatsApp"> WhatsApp</a>
                      <span className='mx-2'>|</span>
                      <a className='bi bi-telegram text-info' href="https://t.me/carloren" target="_blank" rel="noopener" aria-label="Contactar por Telegram"> Telegram </a>
                    </div>
                    <div className="mb-3">
                      <i className="bi bi-geo-alt-fill me-2" aria-hidden="true"></i>
                      <span>{t(language, 'contact.location')}</span>
                    </div>
                  </address>
                  <div className="social-links mt-4" role="group" aria-label="Redes sociales">
                    <a href="https://x.com/Carloren96" className="btn btn-outline-info me-2" target="_blank" rel="noopener" aria-label="Carlos Lorenzo en Twitter/X">
                      <i className="bi bi-twitter" aria-hidden="true"></i>
                    </a>
                    <a href="https://www.instagram.com/carloren96/" className="btn btn-outline-info me-2" target="_blank" rel="noopener" aria-label="Carlos Lorenzo en Instagram">
                      <i className="bi bi-instagram" aria-hidden="true"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/carloren/" className="btn btn-outline-info" target="_blank" rel="noopener" aria-label="Carlos Lorenzo en LinkedIn">
                      <i className="bi bi-linkedin" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
                </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
export default Contacto;
