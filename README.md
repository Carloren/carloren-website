# carloren-website
Custom website about the voice actor Carlos Lorenzo (Carloren)

## Descripción
Sitio web profesional en español para el actor de doblaje Carlos Lorenzo (Carloren). Incluye un backend con API REST y un frontend responsivo con modo día/noche.

## Características

### Backend
- API REST con Node.js y Express
- Base de datos SQLite con tabla de doblajes
- Propiedades: Title, Year, Category, Image, Video, MainCharacter
- Endpoint con filtros por year, title y category
- Datos de ejemplo incluidos

### Frontend
- Navbar responsivo con tres páginas: Inicio, Doblajes, Contacto
- Botón de modo día/noche con iconos de Bootstrap
- Página "Doblajes" con categorías: Series, Películas, Documentales, Locuciones, Audiolibros
- Tarjetas dinámicas que cargan información desde la API
- Diseño completamente responsivo

## Instalación y Uso

### Backend

1. Navegar a la carpeta backend:
```bash
cd backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor:
```bash
npm start
```

El servidor estará corriendo en `http://localhost:3000`

### Frontend

1. Navegar a la carpeta frontend:
```bash
cd frontend
```

2. Abrir el archivo `index.html` en un navegador, o usar un servidor HTTP local:
```bash
# Con Python 3
python3 -m http.server 8080

# Con Node.js (http-server)
npx http-server -p 8080
```

3. Abrir en el navegador: `http://localhost:8080`

## API Endpoints

### GET /api/doblajes
Obtiene la lista de doblajes con filtros opcionales.

**Query Parameters:**
- `year` (opcional): Filtrar por año
- `title` (opcional): Filtrar por título (búsqueda parcial)
- `category` (opcional): Filtrar por categoría

**Ejemplo:**
```
GET /api/doblajes?category=Series
GET /api/doblajes?year=2020
GET /api/doblajes?title=Breaking
```

### GET /api/categories
Obtiene la lista de todas las categorías disponibles.

## Estructura del Proyecto

```
carloren-website/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── database.db (se crea automáticamente)
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── assets/
│       └── images/
└── README.md
```

## Tecnologías Utilizadas

- **Backend:** Node.js, Express, SQLite3
- **Frontend:** HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, Bootstrap Icons
- **Características:** API REST, Responsive Design, Dark Mode, SPA-like Navigation
