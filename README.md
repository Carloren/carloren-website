# carloren-website
Custom website about the voice actor Carlos Lorenzo (Carloren)

## Tech Stack
- **Backend**: Python (Flask) with SQLite database
- **Frontend**: React with JSX components

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   pip3 install -r requirements.txt
   ```
3. Start the backend server:
   ```bash
   python3 server.py
   ```
   The backend will run on http://localhost:3000

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. For development:
   ```bash
   npm run dev
   ```
   The frontend will run on http://localhost:5173

4. For production build:
   ```bash
   npm run build
   ```

## Project Structure
- `backend/` - Python Flask API server
  - `server.py` - Main Flask application
  - `requirements.txt` - Python dependencies
  - `database.db` - SQLite database (auto-generated)
- `frontend/` - React frontend application
  - `src/` - React source code
    - `components/` - React JSX components
    - `main.jsx` - Application entry point
    - `App.jsx` - Main application component
  - `index.html` - HTML entry point (loads React app)

## Features
- Browse voice acting work by category (Series, Películas, Documentales, Locuciones, Audiolibros)
- View highlighted/important works on the home page
- Dark/light theme toggle
- Responsive design with Bootstrap

## Descripción
Sitio web profesional en español para el actor de doblaje Carlos Lorenzo (Carloren). Incluye un backend con API REST y un frontend responsivo con modo día/noche.

## Características

### Backend
- API REST con Node.js y Express
- Base de datos SQLite con tabla de doblajes
- Propiedades: Title, Year, Category, Image, Video, MainCharacter, Important
- Endpoint con filtros por year, title, category e important
- Datos de ejemplo incluidos

### Frontend
- Tres páginas separadas: Inicio, Doblajes y Contacto
- Navbar responsivo con navegación entre páginas
- Botón de modo día/noche con iconos de Bootstrap
- Página "Inicio" muestra trabajos destacados (filtrados por propiedad "important")
- Página "Doblajes" con categorías: Series, Películas, Documentales, Locuciones, Audiolibros
- Página "Contacto" con información de contacto y redes sociales
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

2. Abrir el archivo `inicio.html` en un navegador, o usar un servidor HTTP local:
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
- `important` (opcional): Filtrar por trabajos destacados (true/false)

**Ejemplo:**
```
GET /api/doblajes?category=Series
GET /api/doblajes?year=2020
GET /api/doblajes?title=Breaking
GET /api/doblajes?important=true
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
│   ├── index.html (redirige a inicio.html)
│   ├── inicio.html
│   ├── doblajes.html
│   ├── contacto.html
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
- **Características:** API REST, Responsive Design, Dark Mode, Multi-page Navigation
