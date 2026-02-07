import { t } from '../utils/translations.js';

function Footer({ language, theme }) {
  return (
    <>
      <footer className="py-4 text-center">
        <div className="container">
          <p className="mb-0">&copy; 2026 Carloren - Carlos Lorenzo. {t(language, 'footer.copyright')}
            <a
              className='link-info'
              style={{ cursor: 'pointer' }}
              data-bs-toggle="modal"
              data-bs-target="#pasaveModal"
            >
              {t(language, 'footer.PASAVELink')}
            </a>
          </p>
        </div>
      </footer>

      {/* Modal */}
      <div
        className="modal fade"
        id="pasaveModal"
        tabIndex="-1"
        aria-labelledby="pasaveModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className={`modal-content ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
            <div className={`modal-header ${theme === 'dark' ? 'border-0' : ''}`}>
              <h5 className="modal-title text-info" id="pasaveModalLabel">{t(language, 'footer.PASAVELink')}</h5>
              <button
                type="button"
                className={`btn-close ${theme === 'dark' ? 'btn-close-white' : ''}`}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p style={{ textAlign: 'justify', lineHeight: '1.6' }}>
                {t(language, 'footer.PASAVEText')}
              </p>
            </div>
            <div className={`modal-footer ${theme === 'dark' ? 'border-0' : ''}`}>
              <button
                type="button"
                className='btn btn-info'
                data-bs-dismiss="modal"
              >
                {language === 'es' ? 'Cerrar' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
