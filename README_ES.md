# Sitio Web de Carloren

Sitio web profesional de portafolio de actuación de voz para Carlos Lorenzo (Carloren), mostrando su extenso trabajo de doblaje en series, películas, documentales, locuciones y audiolibros.

## 🎯 Descripción General

Esta es una aplicación web full-stack que presenta el portafolio profesional de actuación de voz de Carlos Lorenzo. Construida con tecnologías web modernas, el sitio cuenta con un diseño responsivo con soporte para tema oscuro/claro, capacidades de filtrado avanzadas, y una presentación limpia con estándares de la industria perfecta para mostrar trabajo de actuación de voz.

## 🛠️ Stack Tecnológico

### Backend
- **Python 3.x** - Entorno de ejecución principal
- **Flask 3.0.0** - Framework web ligero
- **Flask-CORS 4.0.0** - Soporte para compartir recursos entre orígenes
- **SQLite** - Base de datos embebida para almacenamiento de proyectos de doblaje

### Frontend
- **React 18.2.0** - Biblioteca UI moderna para construir interfaces de usuario
- **Vite 5.0.0** - Herramienta de construcción rápida y servidor de desarrollo
- **React Router DOM 7.9.3** - Enrutamiento y navegación del lado del cliente
- **CSS3** - Estilos personalizados con variables CSS para temas

### DevOps y Despliegue
- **Netlify** - Plataforma de hosting para frontend
- **Render.com** - Hosting de API backend
- **Script de despliegue personalizado** - Proceso de despliegue automatizado

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js (v16 o superior)
- Python 3.x
- pip (instalador de paquetes de Python)

### Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Carloren/carloren-website.git
   cd carloren-website
   ```

2. **Configuración del Backend:**
   ```bash
   cd backend
   pip install -r requirements.txt
   python server.py
   ```
   El backend se ejecutará en http://localhost:3000

3. **Configuración del Frontend (en una nueva terminal):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   El frontend se ejecutará en http://localhost:5173

### Construcción de Producción
```bash
cd frontend
npm run build
```

## 📁 Estructura del Proyecto

```
carloren-website/
├── 📄 README.md                    # Documentación del proyecto
├── 📄 API_TESTING.md              # Guía completa de pruebas de API
├── 📄 package.json                # Configuración de paquetes raíz
├── 📄 netlify.toml                # Configuración de despliegue en Netlify
├── 📄 deploy.sh                   # Script de despliegue automatizado
│
├── 🐍 backend/                    # Servidor API Flask de Python
│   ├── 📄 server.py               # Aplicación principal de Flask
│   ├── 📄 requirements.txt        # Dependencias de Python
│   ├── 📄 create_doblajes_db.py   # Script de inicialización de base de datos
│   └── 🗄️ archivos de base de datos # Bases de datos SQLite (creadas en la primera ejecución)
│
└── ⚛️ frontend/                   # Aplicación React
    ├── 📄 package.json            # Dependencias y scripts del frontend
    ├── 📄 vite.config.js          # Configuración de construcción de Vite
    ├── 📄 index.html              # Punto de entrada HTML
    │
    ├── 📁 public/                 # Recursos públicos estáticos
    │   ├── 📄 _headers             # Configuración de headers de Netlify
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
        │   ├── 📄 BrandCarousel.jsx # Carrusel de logos de clientes/compañías
        │   └── 📄 ScrollToTop.jsx # Funcionalidad de scroll automático
        │
        ├── 📁 pages/              # Componentes de páginas de ruta
        │   ├── 📄 Inicio.jsx      # Página de inicio (trabajos destacados)
        │   ├── 📄 Doblajes.jsx    # Portafolio completo con filtros
        │   └── 📄 Contacto.jsx    # Página de información de contacto
        │
        ├── 📁 styles/             # Estilos específicos de componentes
        │   └── 📄 style.css       # Estilos adicionales
        │
        ├── 📁 utils/              # Funciones utilitarias
        │   └── 📄 translations.js # Helpers de idioma/traducción
        │
        └── 📁 assets/             # Recursos multimedia estáticos
            ├── 📁 images/         # Capturas de pantalla y fotos de proyectos
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

### Experiencia de Usuario y Características
- 🌟 **Trabajos Destacados**: Proyectos importantes cuidadosamente seleccionados mostrados en la página principal
- 🌓 **Toggle de Tema**: Cambio fluido entre modo oscuro/claro con persistencia en localStorage
- 📱 **Diseño Responsivo**: Enfoque mobile-first asegurando visualización óptima en todos los dispositivos
- 🔍 **Filtrado Avanzado**: Búsqueda multi-parámetro por año, título, categoría, o nivel de importancia
- ⚡ **Rendimiento Optimizado**: Sistema de construcción potenciado por Vite para carga ultra-rápida
- 🎨 **UI Profesional**: Diseño limpio y moderno que resalta el contenido del portafolio
- 🎯 **Navegación Intuitiva**: Interfaz amigable diseñada para directores de casting y profesionales de la industria

### Características Técnicas
- 🏢 **Integración de Marca**: Carrusel dinámico mostrando colaboración con redes y compañías importantes
- 🔄 **Filtrado en Tiempo Real**: Filtrado del lado del cliente con resultados instantáneos
- 📊 **API RESTful**: API backend bien documentada con suite de pruebas completa
- 🗂️ **Gestión de Categorías**: Contenido organizado a través de múltiples disciplinas de actuación de voz
- 💾 **Persistencia de Datos**: Base de datos SQLite confiable con inicialización automatizada
- 🚀 **Stack Moderno**: Construido con tecnologías web actuales y mejores prácticas

## 🛣️ Rutas de la Aplicación

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `Inicio.jsx` | Página de inicio con trabajos destacados/importantes |
| `/doblajes` | `Doblajes.jsx` | Portafolio completo con filtrado |
| `/contacto` | `Contacto.jsx` | Información de contacto y formulario |

## 🔌 Endpoints de la API

### GET `/api/doblajes`
Obtiene la lista de proyectos de doblaje con filtros opcionales.

**Parámetros de Consulta:**
- `year` (opcional): Filtrar por año específico
- `title` (opcional): Buscar por título (coincidencia parcial)
- `category` (opcional): Filtrar por tipo de categoría
- `important` (opcional): Filtrar trabajos importantes (true/false)

**Formato de Respuesta:**
```json
{
  "doblajes": [
    {
      "id": 1,
      "title": "Breaking Bad",
      "year": 2008,
      "category": "Series",
      "image": "breaking-bad.jpg",
      "video": "",
      "mainCharacter": "Walter White",
      "important": 1
    }
  ]
}
```

**Ejemplos de Solicitudes:**
```bash
# Obtener todos los proyectos
GET /api/doblajes

# Filtrar por categoría
GET /api/doblajes?category=Series

# Buscar por título
GET /api/doblajes?title=Breaking

# Obtener solo trabajos destacados
GET /api/doblajes?important=true

# Filtros combinados
GET /api/doblajes?category=Películas&year=2020
```

### GET `/api/categories`
Devuelve todas las categorías de proyectos disponibles.

**Formato de Respuesta:**
```json
{
  "categories": ["Series", "Películas", "Documentales", "Locuciones", "Audiolibros"]
}
```

## 📊 Esquema de Base de Datos

### Tabla Doblajes
| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | INTEGER PRIMARY KEY | Identificador único |
| `title` | TEXT | Título del proyecto |
| `year` | INTEGER | Año de estreno |
| `category` | TEXT | Categoría del proyecto |
| `image` | TEXT | Nombre del archivo de imagen |
| `video` | TEXT | URL del video (opcional) |
| `mainCharacter` | TEXT | Personaje interpretado |
| `important` | INTEGER | Bandera de trabajo destacado (0/1) |

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

## 🧪 Pruebas y Control de Calidad

### Pruebas de API
Documentación de pruebas completa disponible en [API_TESTING.md](API_TESTING.md) con:
- Documentación completa de endpoints
- Solicitudes y respuestas de muestra  
- Ejemplos de manejo de errores
- Directrices de pruebas de rendimiento

**Verificación Rápida de Salud de la API:**
```bash
# Iniciar servidor backend
cd backend && python server.py

# Probar endpoints principales
curl https://carloren-website.onrender.com/api/doblajes
curl https://carloren-website.onrender.com/api/categories
```

### Pruebas de Frontend
```bash
# Servidor de desarrollo con recarga en caliente
cd frontend && npm run dev

# Pruebas de construcción de producción
npm run build && npm run preview
```

## 🚀 Despliegue

### Configuración de Producción

La aplicación se despliega usando un enfoque de dos niveles:

#### Despliegue de Frontend (Netlify)
```bash
# Despliegue automático vía Netlify
# Configuración en netlify.toml
# Comando de construcción: cd frontend && npm ci && npm run build
# Directorio de publicación: frontend/dist
```

#### Despliegue de Backend (Render.com)
```bash
# Backend hospedado en: https://carloren-website.onrender.com
# Despliegue automático desde repositorio
```

#### Script de Despliegue Manual
Para despliegue manual o pruebas locales:
```bash
# Script de despliegue completo
./deploy.sh

# Características del script:
# - Verificaciones de dependencias del sistema
# - Construcción automatizada del frontend
# - Configuración del backend
# - Inicialización de base de datos
# - Configuración del entorno
```

### Construcción de Desarrollo Local
```bash
# Construcción de producción del frontend
cd frontend
npm run build
# Salida: frontend/dist/

# Ejecución de producción del backend
cd backend
pip install -r requirements.txt
python server.py
```

### Configuración del Entorno
- **Node.js**: Versión 18+ (especificado en netlify.toml)
- **Python**: Versión 3.x requerida
- **Bases de Datos**: Archivos SQLite creados automáticamente en la primera ejecución

## 🤝 Contribuyendo

¡Damos la bienvenida a las contribuciones para mejorar el Sitio Web de Carloren! Por favor sigue estas directrices:

### Empezando
1. **Fork** el repositorio a tu cuenta de GitHub
2. **Clona** tu fork localmente: `git clone https://github.com/tuusuario/carloren-website.git`
3. **Crea** una rama de característica: `git checkout -b feature/nombre-de-tu-caracteristica`

### Flujo de Trabajo de Desarrollo
1. Realiza tus cambios siguiendo el estilo de código existente
2. Prueba tus cambios exhaustivamente (tanto frontend como backend)
3. Actualiza la documentación si es necesario
4. **Confirma** tus cambios: `git commit -am 'Add: descripción breve de tu característica'`
5. **Empuja** a tu rama: `git push origin feature/nombre-de-tu-caracteristica`
6. **Envía** un Pull Request con una descripción clara de tus cambios

### Directrices de Estilo de Código
- Usa indentación consistente (2 espacios para JavaScript/CSS, 4 espacios para Python)
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

*Creado con ❤️ para mostrar talento de actuación de voz de clase mundial* • **Actualizado Febrero 2026**