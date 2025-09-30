// API Configuration
const API_URL = 'http://localhost:3000/api';

// Theme Management
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Load theme from localStorage
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('bi-sun-fill');
        themeIcon.classList.add('bi-moon-fill');
    } else {
        themeIcon.classList.remove('bi-moon-fill');
        themeIcon.classList.add('bi-sun-fill');
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('mainNavbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,.1)';
    }
});

// Fetch and display data
async function fetchDoblajes(category = 'Series') {
    // Map category names to their container IDs
    const categoryMap = {
        'Series': 'series',
        'Películas': 'peliculas',
        'Documentales': 'documentales',
        'Locuciones': 'locuciones',
        'Audiolibros': 'audiolibros'
    };
    
    const containerId = categoryMap[category];
    const contentContainer = document.getElementById(`${containerId}-content`);
    
    if (!contentContainer) {
        console.error(`Container not found: ${containerId}-content`);
        return;
    }
    
    // Show loading spinner
    contentContainer.innerHTML = `
        <div class="col-12">
            <div class="spinner-container">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
            </div>
        </div>
    `;

    try {
        const response = await fetch(`${API_URL}/doblajes?category=${encodeURIComponent(category)}`);
        
        if (!response.ok) {
            throw new Error('Error al cargar los datos');
        }

        const data = await response.json();
        displayDoblajes(data, contentContainer);
    } catch (error) {
        console.error('Error:', error);
        contentContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger" role="alert">
                    Error al cargar los datos. Por favor, asegúrate de que el servidor backend esté funcionando.
                </div>
            </div>
        `;
    }
}

// Fetch and display important doblajes for Inicio page
async function fetchImportantDoblajes() {
    const contentContainer = document.getElementById('important-content');
    
    if (!contentContainer) {
        console.error('Container not found: important-content');
        return;
    }
    
    // Show loading spinner
    contentContainer.innerHTML = `
        <div class="col-12">
            <div class="spinner-container">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
            </div>
        </div>
    `;

    try {
        const response = await fetch(`${API_URL}/doblajes?important=true`);
        
        if (!response.ok) {
            throw new Error('Error al cargar los datos');
        }

        const data = await response.json();
        displayDoblajes(data, contentContainer);
    } catch (error) {
        console.error('Error:', error);
        contentContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger" role="alert">
                    Error al cargar los datos. Por favor, asegúrate de que el servidor backend esté funcionando.
                </div>
            </div>
        `;
    }
}

function displayDoblajes(data, container) {
    if (data.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="empty-state">
                    <i class="bi bi-inbox"></i>
                    <p>No hay trabajos disponibles en esta categoría.</p>
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = data.map(item => `
        <div class="col-lg-4 col-md-6 work-card">
            <div class="card">
                <div class="card-img-top">
                    <i class="bi bi-film"></i>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${escapeHtml(item.title)}</h5>
                    <p class="card-text">
                        <strong>Personaje:</strong> ${escapeHtml(item.mainCharacter)}<br>
                        <span class="badge bg-primary">${item.year}</span>
                        <span class="badge bg-secondary">${escapeHtml(item.category)}</span>
                    </p>
                    ${item.video ? `
                        <a href="${escapeHtml(item.video)}" class="btn btn-sm btn-outline-primary" target="_blank">
                            <i class="bi bi-play-circle"></i> Ver Video
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Helper function to escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text ? text.replace(/[&<>"']/g, m => map[m]) : '';
}

// Tab click handlers
const categoryTabs = document.querySelectorAll('#categoryTabs button[data-category]');
categoryTabs.forEach(tab => {
    tab.addEventListener('shown.bs.tab', (event) => {
        const category = event.target.getAttribute('data-category');
        fetchDoblajes(category);
    });
});

// Load initial data based on current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'inicio.html' || currentPage === 'index.html' || currentPage === '') {
        // Load important doblajes for Inicio page
        if (document.getElementById('important-content')) {
            fetchImportantDoblajes();
        }
    } else if (currentPage === 'doblajes.html') {
        // Load Series by default for Doblajes page
        fetchDoblajes('Series');
    }
    // contacto.html doesn't need to fetch any data
});
