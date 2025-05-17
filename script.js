// Datos de la documentación de la API
// Para agregar una nueva sección, simplemente añade un nuevo objeto al array
const apiSections = [
    {
        id: "introduccion",
        title: "Introducción a la API",
        image: "./images/api.png",
        description: "Esta API está organizada en torno a un patrón RESTful, y se encarga de manejar autenticación y operaciones sobre pacientes. Se podrán utilizar métodos HTTP como GET, POST, PUT y DELETE para interactuar con los recursos."
    },
    {
        id: "sql",
        title: "Base de Datos SQL",
        image: "./images/sql.png",
        description: "La base de datos está estructurada en tablas que representan diferentes entidades, como pacientes, usuarios, tokens de los usuarios y citas. Cada tabla tiene sus propias columnas y tipos de datos."
    }
];

// Función para generar el menú de navegación
function generateNavigation() {
    const navLinks = document.getElementById('nav-links');
    
    apiSections.forEach(section => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        
        a.href = `#${section.id}`;
        a.textContent = section.title;
        
        li.appendChild(a);
        navLinks.appendChild(li);
    });
}

// Función para generar las secciones de contenido
function generateSections() {
    const sectionsContainer = document.getElementById('sections-container');
    
    apiSections.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'api-section';
        sectionDiv.id = section.id;
        
        const title = document.createElement('h2');
        title.textContent = section.title;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'api-content';
        
        const img = document.createElement('img');
        img.src = section.image;
        img.alt = section.title;
        img.className = 'api-image';
        
        const description = document.createElement('p');
        description.textContent = section.description;
        description.className = 'api-description';
        
        contentDiv.appendChild(img);
        contentDiv.appendChild(description);
        
        sectionDiv.appendChild(title);
        sectionDiv.appendChild(contentDiv);
        
        sectionsContainer.appendChild(sectionDiv);
    });
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    generateNavigation();
    generateSections();
    
    // Scroll suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
});