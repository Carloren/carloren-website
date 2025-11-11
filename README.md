# Carloren Website

Custom website showcasing the voice acting portfolio of Carlos Lorenzo (Carloren), featuring his dubbing work across series, movies, documentaries, voice-overs, and audiobooks.

## 🎯 Overview

This is a full-stack web application that displays the professional voice acting work of Carlos Lorenzo. The site features a modern, responsive design with dark/light theme support, showcasing his extensive portfolio across different media categories.

## 🛠️ Tech Stack

### Backend
- **Python 3.x** - Core language
- **Flask 3.0.0** - Web framework
- **Flask-CORS 4.0.0** - Cross-origin resource sharing
- **SQLite** - Database for storing dubbing projects

### Frontend
- **React 18.2.0** - UI library
- **Vite 5.0.0** - Build tool and development server
- **React Router DOM 7.9.3** - Client-side routing
- **Bootstrap Icons 1.13.1** - Icon library
- **CSS3** - Custom styling with theme support

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python 3.x
- pip (Python package installer)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Carloren/carloren-website.git
   cd carloren-website
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   pip install -r requirements.txt
   python server.py
   ```
   Backend will run on http://localhost:3000

3. **Frontend Setup (in a new terminal):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend will run on http://localhost:5173

### Production Build
```bash
cd frontend
npm run build
```

## 📁 Project Structure

```
carloren-website/
├── 📄 README.md                    # Project documentation
├── 📄 API_TESTING.md              # API testing guide
├── 📄 package.json                # Root package dependencies
├── 📄 .gitignore                  # Git ignore rules
│
├── 🐍 backend/                    # Python Flask API
│   ├── 📄 server.py               # Main Flask application
│   ├── 📄 requirements.txt        # Python dependencies
│   ├── 📄 create_doblajes_db.py   # Database initialization script
│   ├── 🗄️ database.db            # SQLite database (main)
│   └── 🗄️ doblajes.db            # SQLite database (backup)
│
└── ⚛️ frontend/                   # React application
    ├── 📄 package.json            # Frontend dependencies
    ├── 📄 vite.config.js          # Vite configuration
    ├── 📄 index.html              # HTML entry point
    ├── 📁 dist/                   # Production build output
    │
    └── 📁 src/                    # Source code
        ├── 📄 main.jsx            # Application entry point
        ├── 📄 App.jsx             # Main app component with routing
        ├── 📄 index.css           # Global styles
        │
        ├── 📁 components/         # Reusable React components
        │   ├── 📄 Navbar.jsx      # Navigation bar with theme toggle
        │   ├── 📄 Footer.jsx      # Site footer
        │   ├── 📄 DubCard.jsx     # Individual dubbing project card
        │   ├── 📄 BrandCarousel.jsx # Brand logo carousel
        │   └── 📄 ScrollToTop.jsx # Scroll to top functionality
        │
        ├── 📁 pages/              # Page components
        │   ├── 📄 Inicio.jsx      # Home page (featured works)
        │   ├── 📄 Doblajes.jsx    # Portfolio page (all works)
        │   └── 📄 Contacto.jsx    # Contact page
        │
        ├── 📁 styles/             # Additional stylesheets
        │   └── 📄 style.css       # Component-specific styles
        │
        └── 📁 assets/             # Static assets
            ├── 📁 images/         # Project images and photos
            └── 📁 logos/          # Brand and company logos
```

## ✨ Features

### Core Functionality
- **Portfolio Showcase**: Browse voice acting work categorized by type:
  - 📺 **Series** - TV show dubbing projects
  - 🎬 **Películas** - Movie dubbing work
  - 📚 **Documentales** - Documentary narrations
  - 🎤 **Locuciones** - Voice-over work and commercials
  - 📖 **Audiolibros** - Audiobook narrations

### User Experience
- 🌟 **Featured Works**: Highlighted important projects on the home page
- 🌓 **Theme Toggle**: Dark/light mode with persistence
- 📱 **Responsive Design**: Mobile-first approach with Bootstrap integration
- 🔍 **Advanced Filtering**: Search by year, title, category, or importance
- ⚡ **Fast Performance**: Optimized with Vite for quick loading
- 🎨 **Modern UI**: Clean, professional design showcasing the portfolio

### Brand Integration
- 🏢 **Brand Carousel**: Showcase of companies and networks worked with
- 🎯 **Professional Presentation**: Industry-standard portfolio layout

## 🛣️ Application Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Inicio.jsx` | Home page with featured/important works |
| `/doblajes` | `Doblajes.jsx` | Complete portfolio with filtering |
| `/contacto` | `Contacto.jsx` | Contact information and form |

## 🔌 API Endpoints

### GET `/api/doblajes`
Fetches the list of dubbing projects with optional filters.

**Query Parameters:**
- `year` (optional): Filter by specific year
- `title` (optional): Search by title (partial match)
- `category` (optional): Filter by category type
- `important` (optional): Filter important works (true/false)

**Response Format:**
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

**Example Requests:**
```bash
# Get all projects
GET /api/doblajes

# Filter by category
GET /api/doblajes?category=Series

# Search by title
GET /api/doblajes?title=Breaking

# Get featured works only
GET /api/doblajes?important=true

# Combined filters
GET /api/doblajes?category=Películas&year=2020
```

### GET `/api/categories`
Returns all available project categories.

**Response Format:**
```json
{
  "categories": ["Series", "Películas", "Documentales", "Locuciones", "Audiolibros"]
}
```

## 📊 Database Schema

### Doblajes Table
| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER PRIMARY KEY | Unique identifier |
| `title` | TEXT | Project title |
| `year` | INTEGER | Release year |
| `category` | TEXT | Project category |
| `image` | TEXT | Image filename |
| `video` | TEXT | Video URL (optional) |
| `mainCharacter` | TEXT | Character voiced |
| `important` | INTEGER | Featured work flag (0/1) |

## 🎨 Styling & Themes

### CSS Custom Properties
The application uses CSS custom properties for theme switching:

**Light Theme:**
- Primary colors with high contrast
- Clean, professional appearance

**Dark Theme:**  
- Dark backgrounds with light text
- Reduced eye strain for night viewing

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🧪 Testing

Comprehensive API testing guide available in `API_TESTING.md`.

**Quick API Test:**
```bash
# Start backend
cd backend && python server.py

# Test endpoint
curl http://localhost:3000/api/doblajes
```

## 🚀 Deployment

### Frontend Build
```bash
cd frontend
npm run build
# Output: frontend/dist/
```

### Backend Deployment
- Ensure Python 3.x is available
- Install dependencies: `pip install -r requirements.txt`
- Run: `python server.py`
- Database files are included in the repository

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## 📄 License

This project is private and proprietary to Carlos Lorenzo (Carloren).

## 📞 Contact

For questions about this project, please visit the contact page at `/contacto` or reach out through the website's contact form.

---

*Built with ❤️ for showcasing professional voice acting work*
