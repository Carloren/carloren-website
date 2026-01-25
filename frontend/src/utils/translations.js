// Translation system for the Carloren website
export const translations = {
  es: {
    // Navigation
    nav: {
      inicio: "Inicio",
      doblajes: "Doblajes", 
      contacto: "Contacto"
    },
    
    // Home page
    home: {
      name: "Carlos Lorenzo",
      subtitle: "Actor de voz y locutor profesional",
      description: "Presto mi voz y doy vida a personajes en series, películas, videojuegos y más.\nYa necesites un grito desgarrador, una voz cálida y amigable, o un tono serio y profesional, cuenta conmigo.",
      featuredWorks: "Trabajos Destacados",
      moreWorks: "Más trabajos"
    },
    
    // Doblajes page
    doblajes: {
      title: "Mis Trabajos",
      subtitle: "Mi página en ElDoblaje.com",
      categories: {
        "Series": "Series",
        "Películas": "Películas", 
        "Documentales": "Documentales",
        "Locuciones": "Locuciones",
        "Audiolibros": "Audiolibros",
        "Videojuegos": "Videojuegos"
      },
      count: "He participado en",
      countSuffix: {
        "Series": "series",
        "Películas": "películas",
        "Documentales": "documentales", 
        "Locuciones": "locuciones",
        "Audiolibros": "audiolibros",
        "Videojuegos": "videojuegos"
      },
      sortBy: "Ordenar por:",
      sortOptions: {
        important: "Destacados",
        year: "Año"
      }
    },
    
    // Contact page
    contact: {
      title: "Contacto",
      cardTitle: "¿Interesado en trabajar conmigo?",
      description: "Estoy disponible para proyectos de doblaje, locución, audiolibros y más. No dudes en contactarme para discutir tu próximo proyecto.",
      location: "Madrid, España"
    },
    
    // Card component
    card: {
      defaultCharacter: "Voces adicionales",
      corporateCharacter: "Corporativo"
    },
    
    // Common
    common: {
      loading: "Cargando...",
      error: "Error al cargar los datos. Por favor, asegúrate de que el servidor backend esté funcionando.",
      noResults: "No hay trabajos disponibles en esta categoría.",
      noFeatured: "No hay trabajos destacados disponibles."
    },
    
    // Footer
    footer: {
      copyright: "Todos los derechos reservados."
    },
    
    // Scroll to top
    scroll: {
      toTop: "Ir arriba"
    }
  },
  
  en: {
    // Navigation
    nav: {
      inicio: "Home",
      doblajes: "Voice Works",
      contacto: "Contact"
    },
    
    // Home page
    home: {
      name: "Carlos Lorenzo",
      subtitle: "Professional Voice Actor and Voice Over Artist",
      description: "I lend my voice and bring characters to life in series, movies, video games and more.\nWhether you need a heartbreaking scream, a warm and friendly voice, or a serious and professional tone, count on me.",
      featuredWorks: "Featured Works",
      moreWorks: "More works"
    },
    
    // Doblajes page
    doblajes: {
      title: "My Works", 
      subtitle: "My page on ElDoblaje.com",
      categories: {
        "Series": "Series",
        "Películas": "Movies",
        "Documentales": "Documentaries", 
        "Locuciones": "Voice Overs",
        "Audiolibros": "Audiobooks",
        "Videojuegos": "Video Games"
      },
      count: "I have participated in",
      countSuffix: {
        "Series": "series",
        "Películas": "movies", 
        "Documentales": "documentaries",
        "Locuciones": "voice overs",
        "Audiolibros": "audiobooks",
        "Videojuegos": "video games"
      },
      sortBy: "Sort by:",
      sortOptions: {
        important: "Featured",
        year: "Year"
      }
    },
    
    // Contact page
    contact: {
      title: "Contact",
      cardTitle: "Interested in working with me?",
      description: "I'm available for dubbing, voice over, audiobook and other projects. Don't hesitate to contact me to discuss your next project.",
      location: "Madrid, Spain"
    },
    
    // Card component
    card: {
      defaultCharacter: "Additional voices",
      corporateCharacter: "Corporate"
    },
    
    // Common
    common: {
      loading: "Loading...",
      error: "Error loading data. Please make sure the backend server is running.",
      noResults: "No works available in this category.",
      noFeatured: "No featured works available."
    },
    
    // Footer
    footer: {
      copyright: "All rights reserved."
    },
    
    // Scroll to top
    scroll: {
      toTop: "Back to top"
    }
  }
};

export const t = (language, path) => {
  const keys = path.split('.');
  let value = translations[language];
  
  for (const key of keys) {
    if (value && typeof value === 'object') {
      value = value[key];
    } else {
      return path; // Return the path if translation not found
    }
  }
  
  return value || path;
};