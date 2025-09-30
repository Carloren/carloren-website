# API Testing Guide

## Test API Endpoints

### Start the backend server
```bash
cd backend
pip3 install -r requirements.txt
python3 server.py
```

### Test all endpoints

#### 1. Get all doblajes (sorted by year descending)
```bash
curl http://localhost:3000/api/doblajes
```

#### 2. Filter by category
```bash
# Series
curl http://localhost:3000/api/doblajes?category=Series

# Películas
curl "http://localhost:3000/api/doblajes?category=Películas"

# Documentales
curl http://localhost:3000/api/doblajes?category=Documentales

# Locuciones
curl http://localhost:3000/api/doblajes?category=Locuciones

# Audiolibros
curl http://localhost:3000/api/doblajes?category=Audiolibros
```

#### 3. Filter by year
```bash
curl http://localhost:3000/api/doblajes?year=2010
curl http://localhost:3000/api/doblajes?year=2021
```

#### 4. Filter by title (partial match)
```bash
curl http://localhost:3000/api/doblajes?title=Breaking
curl http://localhost:3000/api/doblajes?title=Planet
```

#### 5. Filter by important flag
```bash
# Get only important doblajes (for Inicio page)
curl http://localhost:3000/api/doblajes?important=true

# Get non-important doblajes
curl http://localhost:3000/api/doblajes?important=false
```

#### 6. Combine multiple filters
```bash
curl "http://localhost:3000/api/doblajes?category=Audiolibros&year=2021"
curl "http://localhost:3000/api/doblajes?category=Series&title=Game"
```

#### 7. Get all categories
```bash
curl http://localhost:3000/api/categories
```

## Expected Data

The database contains the following sample records (items marked with * are "important" and appear on the Inicio page):

### Series
- *Game of Thrones (2011) - Tyrion Lannister
- *Breaking Bad (2008) - Walter White

### Películas
- *The Godfather (1972) - Vito Corleone
- Inception (2010) - Cobb

### Documentales
- *Blue Planet II (2017) - Narrador
- Planet Earth (2006) - Narrador

### Locuciones
- *Anuncio Nike (2023) - Voz en Off
- Comercial Coca-Cola (2022) - Voz en Off

### Audiolibros
- *El Quijote (2021) - Don Quijote
- Harry Potter y la Piedra Filosofal (2020) - Harry Potter

## API Response Format

Each doblaje object contains:
```json
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
```

Note: The `important` field is a boolean represented as 0 or 1 (SQLite integer).

## Error Handling

If the backend is not running, the frontend will display an error message:
"Error al cargar los datos. Por favor, asegúrate de que el servidor backend esté funcionando."
