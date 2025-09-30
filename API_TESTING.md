# API Testing Guide

## Test API Endpoints

### Start the backend server
```bash
cd backend
npm start
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

#### 5. Combine multiple filters
```bash
curl "http://localhost:3000/api/doblajes?category=Audiolibros&year=2021"
curl "http://localhost:3000/api/doblajes?category=Series&title=Game"
```

#### 6. Get all categories
```bash
curl http://localhost:3000/api/categories
```

## Expected Data

The database contains the following sample records:

### Series
- Game of Thrones (2011) - Tyrion Lannister
- Breaking Bad (2008) - Walter White

### Películas
- Inception (2010) - Cobb
- The Godfather (1972) - Vito Corleone

### Documentales
- Blue Planet II (2017) - Narrador
- Planet Earth (2006) - Narrador

### Locuciones
- Anuncio Nike (2023) - Voz en Off
- Comercial Coca-Cola (2022) - Voz en Off

### Audiolibros
- El Quijote (2021) - Don Quijote
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
  "mainCharacter": "Walter White"
}
```

## Error Handling

If the backend is not running, the frontend will display an error message:
"Error al cargar los datos. Por favor, asegúrate de que el servidor backend esté funcionando."
