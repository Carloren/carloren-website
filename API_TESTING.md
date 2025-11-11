# 🧪 API Testing Guide for Carloren Website

Complete testing documentation for the Flask API backend serving voice acting portfolio data.

## 🚀 Quick Start

### Prerequisites
- Python 3.x installed
- pip package manager
- curl or any HTTP client (Postman, Insomnia, etc.)

### 1. Start the Backend Server

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the Flask server
python server.py
```

**Expected Output:**
```
Sample data inserted (if first run)
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:3000
 * Running on http://[::1]:3000
```

The API will be available at: **http://localhost:3000**

---

## 🔌 API Endpoints Overview

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `GET` | `/api/doblajes` | Get dubbing projects with optional filters | `year`, `title`, `category`, `important` |
| `GET` | `/api/categories` | Get all available project categories | None |

---

## 📋 Detailed API Testing

### 1. Get All Dubbing Projects
**Default behavior:** Returns all projects sorted by year (descending)

```bash
curl -X GET "http://localhost:3000/api/doblajes"
```

**Expected Response:** Array of all dubbing projects
```json
[
  {
    "id": 11,
    "title": "Anuncio Nike",
    "year": 2023,
    "category": "Locuciones",
    "image": "nike.jpg",
    "video": "",
    "mainCharacter": "Voz en Off",
    "important": 1
  },
  {
    "id": 4,
    "title": "Comercial Coca-Cola",
    "year": 2022,
    "category": "Locuciones",
    "image": "coca-cola.jpg",
    "video": "",
    "mainCharacter": "Voz en Off",
    "important": 0
  }
  // ... more projects
]
```

---

### 2. Filter by Category

#### Test all available categories:

**Series (TV Shows)**
```bash
curl -X GET "http://localhost:3000/api/doblajes?category=Series"
```

**Movies (Películas)**
```bash
curl -X GET "http://localhost:3000/api/doblajes?category=Películas"
```

**Documentaries (Documentales)**
```bash
curl -X GET "http://localhost:3000/api/doblajes?category=Documentales"
```

**Voice-overs (Locuciones)**
```bash
curl -X GET "http://localhost:3000/api/doblajes?category=Locuciones"
```

**Audiobooks (Audiolibros)**
```bash
curl -X GET "http://localhost:3000/api/doblajes?category=Audiolibros"
```

**Video Games (Videojuegos)**
```bash
curl -X GET "http://localhost:3000/api/doblajes?category=Videojuegos"
```

---

### 3. Filter by Year

```bash
# Get projects from 2008
curl -X GET "http://localhost:3000/api/doblajes?year=2008"

# Get projects from 2021
curl -X GET "http://localhost:3000/api/doblajes?year=2021"

# Get recent projects (2023)
curl -X GET "http://localhost:3000/api/doblajes?year=2023"
```

---

### 4. Search by Title (Partial Match)

```bash
# Search for "Breaking" (matches "Breaking Bad")
curl -X GET "http://localhost:3000/api/doblajes?title=Breaking"

# Search for "Planet" (matches "Planet Earth")
curl -X GET "http://localhost:3000/api/doblajes?title=Planet"

# Search for "God" (matches "The Godfather", "God of War")
curl -X GET "http://localhost:3000/api/doblajes?title=God"

# Case-insensitive search
curl -X GET "http://localhost:3000/api/doblajes?title=game"
```

---

### 5. Filter by Importance Flag

**Get Featured/Important Projects Only** (for homepage display)
```bash
curl -X GET "http://localhost:3000/api/doblajes?important=true"
```

**Get Non-Featured Projects**
```bash
curl -X GET "http://localhost:3000/api/doblajes?important=false"
```

**Alternative boolean values:**
```bash
# These also work for 'true'
curl -X GET "http://localhost:3000/api/doblajes?important=1"

# These work for 'false'
curl -X GET "http://localhost:3000/api/doblajes?important=0"
```

---

### 6. Combined Filters

**Multiple filter combinations:**

```bash
# Audiobooks from 2021
curl -X GET "http://localhost:3000/api/doblajes?category=Audiolibros&year=2021"

# Important series only
curl -X GET "http://localhost:3000/api/doblajes?category=Series&important=true"

# Movies with "God" in title
curl -X GET "http://localhost:3000/api/doblajes?category=Películas&title=God"

# All important projects from 2017 onwards
curl -X GET "http://localhost:3000/api/doblajes?important=true&year=2017"

# Complex search: Important series with "Game" in title
curl -X GET "http://localhost:3000/api/doblajes?category=Series&title=Game&important=true"
```

---

### 7. Get All Categories

```bash
curl -X GET "http://localhost:3000/api/categories"
```

**Expected Response:**
```json
[
  "Audiolibros",
  "Documentales",
  "Locuciones",
  "Películas",
  "Series",
  "Videojuegos"
]
```

---

## 📊 Sample Database Content

The database auto-populates with the following sample data on first run:

### 📺 Series
- ⭐ **Breaking Bad** (2008) - Walter White
- ⭐ **Game of Thrones** (2011) - Tyrion Lannister

### 🎬 Movies (Películas)  
- ⭐ **The Godfather** (1972) - Vito Corleone
- **Inception** (2010) - Cobb

### 📚 Documentaries (Documentales)
- ⭐ **Blue Planet II** (2017) - Narrator
- **Planet Earth** (2006) - Narrator

### 🎤 Voice-overs (Locuciones)
- ⭐ **Nike Advertisement** (2023) - Voice Over
- **Coca-Cola Commercial** (2022) - Voice Over

### 📖 Audiobooks (Audiolibros)
- ⭐ **Don Quixote** (2021) - Don Quixote
- **Harry Potter and the Philosopher's Stone** (2020) - Harry Potter

### 🎮 Video Games (Videojuegos)
- ⭐ **The Last of Us** (2013) - Joel
- **God of War** (2018) - Kratos

> ⭐ = Featured/Important projects (shown on homepage)

---

## 🔧 Response Format

### Standard Success Response
```json
[
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
```

### Field Descriptions
| Field | Type | Description |
|-------|------|-------------|
| `id` | Integer | Unique project identifier |
| `title` | String | Project title |
| `year` | Integer | Release/production year |
| `category` | String | Project category |
| `image` | String | Image filename |
| `video` | String | Video URL (optional) |
| `mainCharacter` | String | Character/role name |
| `important` | Integer | Featured flag (0 or 1) |

### Error Response Format
```json
{
  "error": "Database connection failed"
}
```

---

## 🐛 Error Handling & Troubleshooting

### Common Issues

**1. Server Not Running**
```bash
curl: (7) Failed to connect to localhost port 3000: Connection refused
```
**Solution:** Start the backend server with `python server.py`

**2. Database Issues**
```json
{"error": "no such table: doblajes"}
```
**Solution:** The database initializes automatically. If issues persist, delete `doblajes.db` and restart the server.

**3. Invalid Category**
```bash
curl -X GET "http://localhost:3000/api/doblajes?category=InvalidCategory"
```
**Result:** Returns empty array `[]` (not an error)

**4. Invalid Year Format**
```bash
curl -X GET "http://localhost:3000/api/doblajes?year=notanumber"
```
**Result:** May cause SQL errors; use valid integers only

---

## 🧩 Frontend Integration

### JavaScript Fetch Examples

```javascript
// Get all projects
const getAllProjects = async () => {
  const response = await fetch('http://localhost:3000/api/doblajes');
  const data = await response.json();
  return data;
};

// Get featured projects for homepage
const getFeaturedProjects = async () => {
  const response = await fetch('http://localhost:3000/api/doblajes?important=true');
  const data = await response.json();
  return data;
};

// Search with filters
const searchProjects = async (category, year, title) => {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (year) params.append('year', year);
  if (title) params.append('title', title);
  
  const response = await fetch(`http://localhost:3000/api/doblajes?${params}`);
  const data = await response.json();
  return data;
};
```

---

## 🔍 Advanced Testing

### Using Postman/Insomnia
1. Import the base URL: `http://localhost:3000`
2. Create requests for each endpoint
3. Set up environment variables for easy testing
4. Use collections to organize test scenarios

### Automated Testing Script
```bash
#!/bin/bash
echo "Testing Carloren API..."

echo "1. Testing basic endpoint..."
curl -s "http://localhost:3000/api/doblajes" | jq length

echo "2. Testing categories..."
curl -s "http://localhost:3000/api/categories" | jq length

echo "3. Testing important filter..."
curl -s "http://localhost:3000/api/doblajes?important=true" | jq length

echo "All tests completed!"
```

---

**📝 Notes:**
- All responses are in JSON format
- Database auto-initializes on first server start
- Case-sensitive category names (use exact spelling)
- Title search is case-insensitive and supports partial matches
- Results always sorted by year (descending)
