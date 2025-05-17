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
    },
    {
        id: "php-conexion",
        title: "Clase PHP: conexión a base de datos",

        description: "Esta clase PHP llamada 'conexion' permite establecer una conexión con una base de datos MySQL utilizando credenciales obtenidas desde un archivo de configuración JSON. Además, contiene métodos para ejecutar consultas (SELECT, INSERT, UPDATE, DELETE), encriptar datos con MD5 y asegurar la codificación UTF-8."
    },
    {
        id: "php-auth",
        title: "Clase PHP: autenticación (auth.php)",

        description: "Esta clase llamada 'auth' se encarga del proceso de inicio de sesión. Verifica si el usuario y contraseña son válidos, encripta la contraseña, consulta los datos del usuario desde la base de datos y, si todo es correcto, genera un token único que se almacena en la tabla 'usuarios_token'."
    },
    {
        id: "php-pacientes",
        title: "Clase PHP: gestión de pacientes (pacientes.php)",

        description: "Esta clase se encarga de gestionar los datos de los pacientes. Permite listar, obtener, crear, actualizar o eliminar registros de pacientes en la base de datos. Para realizar cualquier operación se requiere un token de autenticación válido, lo que garantiza la seguridad del acceso."
    },
    {
        id: "php-respuestas",
        title: "Clase PHP: manejo de respuestas (respuestas.class.php)",

        description: "Esta clase contiene respuestas estándar para errores comunes como método no permitido, datos incompletos, falta de autorización o errores del servidor. Al usar esta clase en los controladores, se garantiza una estructura consistente en los mensajes de error que recibe el cliente."
    },
    {
        id: "php-login-endpoint",
        title: "Endpoint PHP: login.php",

        description: "Este archivo funciona como el punto de entrada para el inicio de sesión. Recibe solicitudes POST, valida usuario y contraseña usando la clase 'auth', y devuelve un token en caso de éxito o un mensaje de error si la autenticación falla."
    },
    {
        id: "php-prueba-conexion",
        title: "Script PHP: prueba de conexión",

        description: "Este archivo prueba la conexión con la base de datos utilizando la clase 'conexion'. Muestra cómo se pueden realizar consultas como INSERT desde PHP. Aunque el código de ejemplo está comentado, sirve como base para ejecutar pruebas SQL rápidamente."
    },
    {
        id: "php-endpoint-pacientes",
        title: "Endpoint PHP: pacientes.php",
        description: "Este archivo funciona como el endpoint REST que permite interactuar con los datos de los pacientes. Maneja los métodos HTTP GET, POST, PUT y DELETE para listar, crear, actualizar o eliminar pacientes según los datos recibidos. Requiere token de autenticación para ciertas operaciones como POST, PUT y DELETE."
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
        
        // Solo crea y agrega la imagen si el atributo image está definido
        if (section.image) {
            const img = document.createElement('img');
            img.src = section.image;
            img.alt = section.title;
            img.className = 'api-image';
            contentDiv.appendChild(img);
        }
        
        const description = document.createElement('p');
        description.textContent = section.description;
        description.className = 'api-description';
        
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