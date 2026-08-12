# Sitio Web de Carloren

Sitio web profesional de portafolio de actuación de voz para Carlos Lorenzo (Carloren), mostrando su extenso trabajo de doblaje en series, películas, documentales, locuciones y audiolibros.

## 🎯 Descripción General

Esta es una aplicación web estática de una sola página que presenta el portafolio profesional de actuación de voz de Carlos Lorenzo. Construida con tecnologías web modernas, el sitio cuenta con un diseño responsivo con soporte para tema oscuro/claro, capacidades de filtrado avanzadas, y una presentación limpia con estándares de la industria perfecta para mostrar trabajo de actuación de voz.

## 🛠️ Stack Tecnológico

### Frontend
- **React 18.2.0** - Biblioteca UI moderna para construir interfaces de usuario
- **Vite 5.0.0** - Herramienta de construcción rápida y servidor de desarrollo
- **React Router DOM 7.9.3** - Enrutamiento y navegación del lado del cliente
- **Swiper** - Carrusel de logos de marcas
- **CSS3** - Estilos personalizados con variables CSS para temas

### Datos
- Todo el contenido del portafolio vive en [`frontend/src/data/doblajes.json`](frontend/src/data/doblajes.json) y se empaqueta en el build — no hay backend ni base de datos. Las imágenes/vídeos se alojan externamente (Cloudinary/YouTube) y se referencian por URL.

### DevOps y Despliegue
- **Netlify** - Hosting estático, construye y despliega automáticamente en cada push

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js (v18 o superior)

### Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Carloren/carloren-website.git
   cd carloren-website
   ```

2. **Configuración del Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   El sitio se ejecutará en http://localhost:5173

### Construcción de Producción
```bash
cd frontend
npm run build
npm run preview # para probar el build de producción en local
```

## 📁 Estructura del Proyecto

```
carloren-website/
├── 📄 README.md                    # Documentación del proyecto
├── 📄 netlify.toml                 # Configuración de despliegue en Netlify
│
└── ⚛️ frontend/                   # Aplicación React
    ├── 📄 package.json            # Dependencias y scripts del frontend
    ├── 📄 vite.config.js          # Configuración de construcción de Vite
    ├── 📄 index.html              # Punto de entrada HTML
    │
    ├── 📁 public/                 # Recursos públicos estáticos
    │   ├── 📄 _headers             # Configuración de headers de Netlify
    │   ├── 📄 robots.txt            # Reglas para rastreadores
    │   └── 📄 sitemap.xml          # Mapa del sitio SEO
    │
    └── 📁 src/                    # Código fuente de React
        ├── 📄 main.jsx            # Punto de entrada de la aplicación
        ├── 📄 App.jsx             # Componente principal de la app con enrutamiento
        ├── 📄 index.css           # Estilos globales y variables CSS
        │
        ├── 📁 components/         # Componentes React reutilizables
        │   ├── 📄 Navbar.jsx      # Navegación con toggle de tema
        │   ├── 📄 Footer.jsx      # Pie de página del sitio
        │   ├── 📄 DubCard.jsx     # Tarjeta de proyecto de portafolio
        │   ├── 📄 BrandCarousel.jsx # Carrusel de logos de clientes/compañías (Swiper)
        │   └── 📄 ScrollToTop.jsx # Funcionalidad de scroll automático
        │
        ├── 📁 pages/              # Componentes de páginas de ruta
        │   ├── 📄 Inicio.jsx      # Página de inicio (trabajos destacados)
        │   ├── 📄 Doblajes.jsx    # Portafolio completo con filtros
        │   └── 📄 Contacto.jsx    # Página de información de contacto
        │
        ├── 📁 data/               # Contenido del portafolio
        │   └── 📄 doblajes.json   # Todos los trabajos de doblaje/locución
        │
        ├── 📁 styles/             # Estilos específicos de componentes
        │   └── 📄 style.css       # Estilos adicionales
        │
        ├── 📁 utils/              # Funciones utilitarias
        │   └── 📄 translations.js # Helpers de idioma/traducción
        │
        └── 📁 assets/             # Recursos multimedia estáticos
            ├── 📁 images/         # Branding del sitio (logo, favicon)
            └── 📁 logos/          # Logos de marcas y compañías
```

## ✨ Características

### Funcionalidad Principal
- **Exhibición de Portafolio**: Navegar por trabajos de actuación de voz categorizados por tipo:
  - 📺 **Series** - Proyectos de doblaje de programas de TV
  - 🎬 **Películas** - Trabajo de doblaje de películas
  - 📚 **Documentales** - Narraciones de documentales
  - 🎤 **Locuciones** - Trabajo de voice-over y comerciales
  - 📖 **Audiolibros** - Narraciones de audiolibros
  - 🎮 **Videojuegos** - Trabajo de doblaje de videojuegos

### Experiencia de Usuario y Características
- 🌟 **Trabajos Destacados**: Proyectos importantes cuidadosamente seleccionados mostrados en la página principal
- 🌓 **Toggle de Tema**: Cambio fluido entre modo oscuro/claro con persistencia en localStorage
- 📱 **Diseño Responsivo**: Enfoque mobile-first asegurando visualización óptima en todos los dispositivos
- 🔍 **Filtrado Avanzado**: Filtrado del lado del cliente por categoría, año e importancia
- ⚡ **Rendimiento Optimizado**: Construcción potenciada por Vite, totalmente estática, sin llamadas a backend
- 🎨 **UI Profesional**: Diseño limpio y moderno que resalta el contenido del portafolio
- 🎯 **Navegación Intuitiva**: Interfaz amigable diseñada para directores de casting y profesionales de la industria

### Características Técnicas
- 🏢 **Integración de Marca**: Carrusel con Swiper mostrando colaboración con redes y compañías importantes
- 🔄 **Filtrado en Tiempo Real**: Filtrado del lado del cliente con resultados instantáneos, sin peticiones de red
- 🗂️ **Gestión de Categorías**: Contenido organizado a través de múltiples disciplinas de actuación de voz

## 🛣️ Rutas de la Aplicación

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `Inicio.jsx` | Página de inicio con trabajos destacados/importantes |
| `/doblajes` | `Doblajes.jsx` | Portafolio completo con filtrado |
| `/contacto` | `Contacto.jsx` | Información de contacto y formulario |

## 📊 Añadir un trabajo nuevo

No hay base de datos ni API que actualizar. Edita [`frontend/src/data/doblajes.json`](frontend/src/data/doblajes.json) directamente y añade una entrada nueva:

```json
{
  "id": 163,
  "title": "Nombre del trabajo",
  "year": 2026,
  "category": "Series",
  "image": "https://res.cloudinary.com/.../imagen.jpg",
  "video": "",
  "mainCharacter": "Personaje (Actor original)",
  "important": 1
}
```

- `id`: el siguiente número libre (el `id` más alto actual + 1).
- `category`: debe coincidir exactamente con una de `Series`, `Películas`, `Documentales`, `Locuciones`, `Audiolibros`, `Videojuegos`.
- `image` / `video`: sube el archivo a Cloudinary (o enlaza un embed de YouTube) y pega aquí la URL resultante. `video` tiene prioridad visual sobre `image` cuando ambos están presentes.
- `important`: `1` si quieres que aparezca en la home, `0` si no.

Haz commit y push — Netlify reconstruye automáticamente.

## 🎨 Estilos y Temas

### Propiedades Personalizadas CSS
La aplicación usa propiedades personalizadas CSS para el cambio de temas:

**Tema Claro:**
- Colores primarios con alto contraste
- Apariencia limpia y profesional

**Tema Oscuro:**
- Fondos oscuros con texto claro
- Reducción de fatiga visual para visualización nocturna

### Breakpoints Responsivos
- **Móvil**: < 768px
- **Tablet**: 768px - 1024px
- **Escritorio**: > 1024px

## 🚀 Despliegue

El sitio es un build estático desplegado en **Netlify**:
- Comando de construcción: `cd frontend && npm ci && npm run build`
- Directorio de publicación: `frontend/dist`
- Se despliega automáticamente en cada push (configurado en `netlify.toml`)

### Entorno
- **Node.js**: Versión 18+ (especificado en `netlify.toml`)

## 🤝 Contribuyendo

¡Damos la bienvenida a las contribuciones para mejorar el Sitio Web de Carloren! Por favor sigue estas directrices:

### Empezando
1. **Fork** el repositorio a tu cuenta de GitHub
2. **Clona** tu fork localmente: `git clone https://github.com/tuusuario/carloren-website.git`
3. **Crea** una rama de característica: `git checkout -b feature/nombre-de-tu-caracteristica`

### Flujo de Trabajo de Desarrollo
1. Realiza tus cambios siguiendo el estilo de código existente
2. Prueba tus cambios exhaustivamente
3. Actualiza la documentación si es necesario
4. **Confirma** tus cambios: `git commit -am 'Add: descripción breve de tu característica'`
5. **Empuja** a tu rama: `git push origin feature/nombre-de-tu-caracteristica`
6. **Envía** un Pull Request con una descripción clara de tus cambios

### Directrices de Estilo de Código
- Usa indentación consistente (2 espacios para JavaScript/CSS)
- Sigue las mejores prácticas de React y patrones de hooks
- Escribe mensajes de commit descriptivos
- Incluye comentarios para lógica compleja

## 📄 Licencia

Este proyecto es software propietario propiedad de Carlos Lorenzo (Carloren). Todos los derechos reservados. Ninguna parte de este software puede ser reproducida, distribuida, o transmitida sin permiso escrito explícito del propietario.

## 📞 Contacto y Soporte

**Consultas Profesionales**: Visita la página [/contacto](frontend/src/pages/Contacto.jsx) en el sitio web

**Soporte Técnico**: Para problemas técnicos o preguntas sobre la implementación de este proyecto

**Redes Sociales**: Conéctate con Carlos Lorenzo a través de los enlaces proporcionados en el sitio web

---

*Creado con ❤️ para mostrar talento de actuación de voz de clase mundial* • **Actualizado Agosto 2026**
