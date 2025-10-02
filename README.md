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
