import { useState, useEffect } from 'react';
import { t } from '../utils/translations.js';

function ScrollToTop({ language }) {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top btn btn-info"
          aria-label={t(language, 'scroll.toTop')}
        >
          <i className="bi bi-arrow-up"></i>
        </button>
      )}
    </>
  );
}

export default ScrollToTop;
