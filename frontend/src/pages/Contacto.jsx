import { t } from '../utils/translations.js';

function Contacto({ language }) {
  return (
    <section id="contacto" className="py-5" style={{ marginTop: '56px' }}>
      <div className="container">
        <h2 className="text-center mb-5">{t(language, 'contact.title')}</h2>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-sm" style={{transform: "translateY(0px)"}}>
              <div className="card-body p-4">
                <h5 className="card-title mb-4">{t(language, 'contact.cardTitle')}</h5>
                <p className="card-text mb-4">
                  {t(language, 'contact.description')}
                </p>
                <div className="contact-info">
                  <div className="mb-3">
                    <i className="bi bi-envelope-fill me-2"></i>
                    <a href="mailto:carloren.1996@gmail.com" target="_blank">carloren.1996@gmail.com</a>
                  </div>
                  <div className="mb-3">
                    <i className="bi bi-telephone-fill me-2"></i>
                    <a className='bi bi-whatsapp text-success' href="https://wa.link/sddaj4" target="_blank"> WhatsApp</a>
                    <span className='mx-2'>|</span>
                    <a className='bi bi-telegram text-info' href="https://t.me/carloren" target="_blank"> Telegram </a>
                    {/* <span>+34 676 310 141</span> */}
                  </div>
                  <div className="mb-3">
                    <i className="bi bi-geo-alt-fill me-2"></i>
                    <span>{t(language, 'contact.location')}</span>
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
