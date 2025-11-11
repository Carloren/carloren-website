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
   pip install -r requirements.txt
   ```
3. Start the backend server:
   ```bash
   python server.py
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
Fetches the list of dubs with optional filters.

**Query Parameters:**
- `year` (optional): Filter by year
- `title` (optional): Filter by title
- `category` (optional): Filter by category
- `important` (optional): Filter by important jobs (true/false)

**Examples:**
```
GET /api/doblajes?category=Series
GET /api/doblajes?year=2020
GET /api/doblajes?title=Breaking
GET /api/doblajes?important=true
```

### GET /api/categories
Fetches the list of all avalaible categories.
