# Carloren Website

Professional voice acting portfolio website for Carlos Lorenzo (Carloren), showcasing his extensive dubbing work across series, movies, documentaries, voice-overs, and audiobooks.

## 🎯 Overview

This is a static single-page application that presents the professional voice acting portfolio of Carlos Lorenzo. Built with modern web technologies, the site features a responsive design with dark/light theme support, advanced filtering capabilities, and a clean, industry-standard presentation perfect for showcasing voice acting work.

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Modern UI library for building user interfaces
- **Vite 5.0.0** - Fast build tool and development server
- **React Router DOM 7.9.3** - Client-side routing and navigation
- **Swiper** - Brand logo carousel
- **CSS3** - Custom styling with CSS variables for theming

### Data
- All portfolio content lives in [`frontend/src/data/doblajes.json`](frontend/src/data/doblajes.json) and is bundled at build time — no backend or database involved. Images/videos are hosted externally (Cloudinary/YouTube) and referenced by URL.

### DevOps & Deployment
- **Netlify** - Static hosting, builds and deploys automatically on push

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Carloren/carloren-website.git
   cd carloren-website
   ```

2. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The site will run on http://localhost:5173

### Production Build
```bash
cd frontend
npm run build
npm run preview # to test the production build locally
```

## 📁 Project Structure

```
carloren-website/
├── 📄 README.md                    # Project documentation
├── 📄 netlify.toml                 # Netlify deployment configuration
│
└── ⚛️ frontend/                    # React application
    ├── 📄 package.json             # Frontend dependencies & scripts
    ├── 📄 vite.config.js           # Vite build configuration
    ├── 📄 index.html               # HTML entry point
    │
    ├── 📁 public/                  # Static public assets
    │   ├── 📄 _headers              # Netlify headers configuration
    │   ├── 📄 robots.txt             # Crawler rules
    │   └── 📄 sitemap.xml            # SEO sitemap
    │
    └── 📁 src/                     # React source code
        ├── 📄 main.jsx             # Application entry point
        ├── 📄 App.jsx              # Main app component with routing
        ├── 📄 index.css            # Global styles & CSS variables
        │
        ├── 📁 components/          # Reusable React components
        │   ├── 📄 Navbar.jsx       # Navigation with theme toggle
        │   ├── 📄 Footer.jsx       # Site footer
        │   ├── 📄 DubCard.jsx      # Portfolio project card
        │   ├── 📄 BrandCarousel.jsx # Client/company logo carousel (Swiper)
        │   └── 📄 ScrollToTop.jsx  # Auto-scroll functionality
        │
        ├── 📁 pages/               # Route page components
        │   ├── 📄 Inicio.jsx       # Home page (featured works)
        │   ├── 📄 Doblajes.jsx     # Full portfolio with filters
        │   └── 📄 Contacto.jsx     # Contact information page
        │
        ├── 📁 data/                # Portfolio content
        │   └── 📄 doblajes.json    # All dubbing/voice-acting entries
        │
        ├── 📁 styles/              # Component-specific styles
        │   └── 📄 style.css        # Additional styling
        │
        ├── 📁 utils/               # Utility functions
        │   └── 📄 translations.js # Language/translation helpers
        │
        └── 📁 assets/              # Static media assets
            ├── 📁 images/          # Site branding (logo, favicon)
            └── 📁 logos/           # Brand and company logos
```

## ✨ Features

### Core Functionality
- **Portfolio Showcase**: Browse voice acting work categorized by type:
  - 📺 **Series** - TV show dubbing projects
  - 🎬 **Películas** - Movie dubbing work
  - 📚 **Documentales** - Documentary narrations
  - 🎤 **Locuciones** - Voice-over work and commercials
  - 📖 **Audiolibros** - Audiobook narrations
  - 🎮 **Videojuegos** - Video game dubbing work

### User Experience & Features
- 🌟 **Featured Works**: Carefully curated important projects displayed on homepage
- 🌓 **Theme Toggle**: Seamless dark/light mode switching with localStorage persistence
- 📱 **Responsive Design**: Mobile-first approach ensuring optimal viewing on all devices
- 🔍 **Advanced Filtering**: Client-side filtering by category, year, and importance
- ⚡ **Optimized Performance**: Vite-powered build, fully static, no backend round-trip
- 🎨 **Professional UI**: Clean, modern design that highlights the portfolio content
- 🎯 **Intuitive Navigation**: User-friendly interface designed for casting directors and industry professionals

### Technical Features
- 🏢 **Brand Integration**: Swiper-powered carousel showcasing collaboration with major networks and companies
- 🔄 **Real-time Filtering**: Client-side filtering with instant results, no network requests
- 🗂️ **Category Management**: Organized content across multiple voice acting disciplines

## 🛣️ Application Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Inicio.jsx` | Home page with featured/important works |
| `/doblajes` | `Doblajes.jsx` | Complete portfolio with filtering |
| `/contacto` | `Contacto.jsx` | Contact information and form |

## 📊 Adding a new work

There is no database or API to update. Edit [`frontend/src/data/doblajes.json`](frontend/src/data/doblajes.json) directly and add a new entry:

```json
{
  "id": 163,
  "title": "Project title",
  "year": 2026,
  "category": "Series",
  "image": "https://res.cloudinary.com/.../image.jpg",
  "video": "",
  "mainCharacter": "Character (Original actor)",
  "important": 1
}
```

- `id`: next free number (use the highest existing `id` + 1).
- `category`: must exactly match one of `Series`, `Películas`, `Documentales`, `Locuciones`, `Audiolibros`, `Videojuegos`.
- `image` / `video`: upload the asset to Cloudinary (or link a YouTube embed) and paste the resulting URL. `video` takes visual priority over `image` when both are present.
- `important`: `1` to feature it on the homepage, `0` otherwise.

Commit and push — Netlify rebuilds automatically.

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

## 🚀 Deployment

The site is a static build deployed on **Netlify**:
- Build command: `cd frontend && npm ci && npm run build`
- Publish directory: `frontend/dist`
- Deploys automatically on every push (configured in `netlify.toml`)

### Environment
- **Node.js**: Version 18+ (specified in `netlify.toml`)

## 🤝 Contributing

We welcome contributions to improve the Carloren Website! Please follow these guidelines:

### Getting Started
1. **Fork** the repository to your GitHub account
2. **Clone** your fork locally: `git clone https://github.com/yourusername/carloren-website.git`
3. **Create** a feature branch: `git checkout -b feature/your-feature-name`

### Development Workflow
1. Make your changes following the existing code style
2. Test your changes thoroughly
3. Update documentation if necessary
4. **Commit** your changes: `git commit -am 'Add: brief description of your feature'`
5. **Push** to your branch: `git push origin feature/your-feature-name`
6. **Submit** a Pull Request with a clear description of your changes

### Code Style Guidelines
- Use consistent indentation (2 spaces for JavaScript/CSS)
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

*Crafted with ❤️ to showcase world-class voice acting talent* • **Updated August 2026**
