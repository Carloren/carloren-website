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

// Update active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
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

// Load initial data for Series
document.addEventListener('DOMContentLoaded', () => {
    fetchDoblajes('Series');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});
