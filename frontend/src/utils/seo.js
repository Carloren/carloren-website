const BASE_URL = 'https://carlorenvoice.com';

// Updates document title + the meta/OG/Twitter tags that were otherwise
// frozen to the homepage's values on every route.
export function updateMetaTags({ title, description, path }) {
  document.title = title;

  const setContent = (selector, content) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute('content', content);
  };

  setContent('meta[name="description"]', description);
  setContent('meta[property="og:title"]', title);
  setContent('meta[property="og:description"]', description);
  setContent('meta[name="twitter:title"]', title);
  setContent('meta[name="twitter:description"]', description);

  const canonicalUrl = `${BASE_URL}${path}`;
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', canonicalUrl);
  setContent('meta[property="og:url"]', canonicalUrl);
}
