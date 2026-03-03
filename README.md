# Carloren Website

Professional voice acting portfolio website for Carlos Lorenzo (Carloren), showcasing his extensive dubbing work across series, movies, documentaries, voice-overs, and audiobooks.

## 🎯 Overview

This is a full-stack web application that presents the professional voice acting portfolio of Carlos Lorenzo. Built with modern web technologies, the site features a responsive design with dark/light theme support, advanced filtering capabilities, and a clean, industry-standard presentation perfect for showcasing voice acting work.

## 🛠️ Tech Stack

### Backend
- **Python 3.x** - Core runtime environment
- **Flask 3.0.0** - Lightweight web framework
- **Flask-CORS 4.0.0** - Cross-origin resource sharing support
- **SQLite** - Embedded database for dubbing projects storage

### Frontend
- **React 18.2.0** - Modern UI library for building user interfaces
- **Vite 5.0.0** - Fast build tool and development server
- **React Router DOM 7.9.3** - Client-side routing and navigation
- **CSS3** - Custom styling with CSS variables for theming

### DevOps & Deployment
- **Netlify** - Frontend hosting platform
- **Render.com** - Backend API hosting
- **Custom deployment script** - Automated deployment process

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
├── 📄 API_TESTING.md              # Comprehensive API testing guide
├── 📄 package.json                # Root package configuration
├── 📄 netlify.toml                # Netlify deployment configuration
├── 📄 deploy.sh                   # Automated deployment script
│
├── 🐍 backend/                    # Python Flask API server
│   ├── 📄 server.py               # Main Flask application
│   ├── 📄 requirements.txt        # Python dependencies
│   ├── 📄 create_doblajes_db.py   # Database initialization script
│   └── 🗄️ database files          # SQLite databases (created on first run)
│
└── ⚛️ frontend/                   # React application
    ├── 📄 package.json            # Frontend dependencies & scripts
    ├── 📄 vite.config.js          # Vite build configuration
    ├── 📄 index.html              # HTML entry point
    │
    ├── 📁 public/                 # Static public assets
    │   ├── 📄 _headers             # Netlify headers configuration
    │   └── 📄 sitemap.xml          # SEO sitemap
    │
    └── 📁 src/                    # React source code
        ├── 📄 main.jsx            # Application entry point
        ├── 📄 App.jsx             # Main app component with routing
        ├── 📄 index.css           # Global styles & CSS variables
        │
        ├── 📁 components/         # Reusable React components
        │   ├── 📄 Navbar.jsx      # Navigation with theme toggle
        │   ├── 📄 Footer.jsx      # Site footer
        │   ├── 📄 DubCard.jsx     # Portfolio project card
        │   ├── 📄 BrandCarousel.jsx # Client/company logo carousel
        │   └── 📄 ScrollToTop.jsx # Auto-scroll functionality
        │
        ├── 📁 pages/              # Route page components
        │   ├── 📄 Inicio.jsx      # Home page (featured works)
        │   ├── 📄 Doblajes.jsx    # Full portfolio with filters
        │   └── 📄 Contacto.jsx    # Contact information page
        │
        ├── 📁 styles/             # Component-specific styles
        │   └── 📄 style.css       # Additional styling
        │
        ├── 📁 utils/              # Utility functions
        │   └── 📄 translations.js # Language/translation helpers
        │
        └── 📁 assets/             # Static media assets
            ├── 📁 images/         # Project screenshots & photos
            └── 📁 logos/          # Brand and company logos
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

### User Experience & Features
- 🌟 **Featured Works**: Carefully curated important projects displayed on homepage
- 🌓 **Theme Toggle**: Seamless dark/light mode switching with localStorage persistence
- 📱 **Responsive Design**: Mobile-first approach ensuring optimal viewing on all devices
- 🔍 **Advanced Filtering**: Multi-parameter search by year, title, category, or importance level
- ⚡ **Optimized Performance**: Vite-powered build system for lightning-fast loading
- 🎨 **Professional UI**: Clean, modern design that highlights the portfolio content
- 🎯 **Intuitive Navigation**: User-friendly interface designed for casting directors and industry professionals

### Technical Features
- 🏢 **Brand Integration**: Dynamic carousel showcasing collaboration with major networks and companies
- 🔄 **Real-time Filtering**: Client-side filtering with instant results
- 📊 **RESTful API**: Well-documented backend API with comprehensive testing suite
- 🗂️ **Category Management**: Organized content across multiple voice acting disciplines
- 💾 **Data Persistence**: Reliable SQLite database with automated initialization
- 🚀 **Modern Stack**: Built with current web technologies and best practices

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

## 🧪 Testing & Quality Assurance

### API Testing
Comprehensive testing documentation available in [API_TESTING.md](API_TESTING.md) with:
- Complete endpoint documentation
- Sample requests and responses  
- Error handling examples
- Performance testing guidelines

**Quick API Health Check:**
```bash
# Start backend server
cd backend && python server.py

# Test main endpoints
curl https://carloren-website.onrender.com/api/doblajes
curl https://carloren-website.onrender.com/api/categories
```

### Frontend Testing
```bash
# Development server with hot reload
cd frontend && npm run dev

# Production build testing
npm run build && npm run preview
```

## 🚀 Deployment

### Production Setup

The application is deployed using a two-tier approach:

#### Frontend Deployment (Netlify)
```bash
# Automatic deployment via Netlify
# Configuration in netlify.toml
# Build command: cd frontend && npm ci && npm run build
# Publish directory: frontend/dist
```

#### Backend Deployment (Render.com)
```bash
# Backend hosted at: https://carloren-website.onrender.com
# Automatic deployment from repository
```

#### Manual Deployment Script
For manual deployment or local testing:
```bash
# Full deployment script
./deploy.sh

# Script features:
# - System dependency checks
# - Automated frontend build
# - Backend configuration
# - Database initialization
# - Environment setup
```

### Local Development Build
```bash
# Frontend production build
cd frontend
npm run build
# Output: frontend/dist/

# Backend production run
cd backend
pip install -r requirements.txt
python server.py
```

### Environment Configuration
- **Node.js**: Version 18+ (specified in netlify.toml)
- **Python**: Version 3.x required
- **Databases**: SQLite files created automatically on first run

## 🤝 Contributing

We welcome contributions to improve the Carloren Website! Please follow these guidelines:

### Getting Started
1. **Fork** the repository to your GitHub account
2. **Clone** your fork locally: `git clone https://github.com/yourusername/carloren-website.git`
3. **Create** a feature branch: `git checkout -b feature/your-feature-name`

### Development Workflow
1. Make your changes following the existing code style
2. Test your changes thoroughly (both frontend and backend)
3. Update documentation if necessary
4. **Commit** your changes: `git commit -am 'Add: brief description of your feature'`
5. **Push** to your branch: `git push origin feature/your-feature-name`
6. **Submit** a Pull Request with a clear description of your changes

### Code Style Guidelines
- Use consistent indentation (2 spaces for JavaScript/CSS, 4 spaces for Python)
- Follow React best practices and hooks patterns
- Write descriptive commit messages
- Include comments for complex logic

## 📄 License

This project is proprietary software owned by Carlos Lorenzo (Carloren). All rights reserved. No part of this software may be reproduced, distributed, or transmitted without explicit written permission from the owner.

## 📞 Contact & Support

**Professional Inquiries**: Visit [/contacto](frontend/src/pages/Contacto.jsx) page on the website

**Technical Support**: For technical issues or questions about this project implementation

**Social Media**: Connect with Carlos Lorenzo through the links provided on the website

---

*Crafted with ❤️ to showcase world-class voice acting talent* • **Updated February 2026**
