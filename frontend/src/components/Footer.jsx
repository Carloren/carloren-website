import { t } from '../utils/translations.js';

function Footer({ language }) {
  return (
    <footer className="py-4 text-center">
      <div className="container">
        <p className="mb-0">&copy; 2026 Carloren - Carlos Lorenzo. {t(language, 'footer.copyright')}</p>
      </div>
    </footer>
  );
}

export default Footer;
