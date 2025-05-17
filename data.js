// Datos de la API (puedes modificar o ampliar esta estructura)
const apiData = [
    {
        id: 'introduccion',
        title: 'Introducción',
        content: [
            {
                title: '¿Qué es nuestra API?',
                description: 'Nuestra API proporciona acceso a datos y funcionalidades a través de endpoints RESTful. Esta documentación explica cómo utilizar cada endpoint, los parámetros necesarios y las respuestas esperadas.',
                image: 'https://via.placeholder.com/800x400?text=Diagrama+API',
                code: 'const response = await fetch("https://api.ejemplo.com/v1/recurso");\nconst data = await response.json();'
            }
        ]
    },
    {
        id: 'autenticacion',
        title: 'Autenticación',
        content: [
            {
                title: 'Obtener token de acceso',
                method: 'POST',
                endpoint: '/auth/token',
                description: 'Para utilizar nuestra API, primero debes obtener un token de autenticación. Este token debe incluirse en todas las solicitudes posteriores.',
                image: 'https://via.placeholder.com/800x400?text=Flujo+de+Autenticación',
                code: 'const response = await fetch("https://api.ejemplo.com/auth/token", {\n  method: "POST",\n  headers: {\n    "Content-Type": "application/json"\n  },\n  body: JSON.stringify({\n    username: "usuario",\n    password: "contraseña"\n  })\n});\n\nconst { token } = await response.json();'
            }
        ]
    },
    {
        id: 'endpoints',
        title: 'Endpoints',
        content: [
            {
                title: 'Listar recursos',
                method: 'GET',
                endpoint: '/api/recursos',
                description: 'Obtiene una lista de todos los recursos disponibles.',
                image: 'https://via.placeholder.com/800x400?text=Ejemplo+Listado+Recursos',
                code: 'const response = await fetch("https://api.ejemplo.com/api/recursos", {\n  headers: {\n    "Authorization": "Bearer " + token\n  }\n});\n\nconst recursos = await response.json();'
            },
            {
                title: 'Obtener recurso específico',
                method: 'GET',
                endpoint: '/api/recursos/{id}',
                description: 'Obtiene los detalles de un recurso específico según su ID.',
                image: 'https://via.placeholder.com/800x400?text=Ejemplo+Recurso+Específico',
                code: 'const id = "123";\nconst response = await fetch(`https://api.ejemplo.com/api/recursos/${id}`, {\n  headers: {\n    "Authorization": "Bearer " + token\n  }\n});\n\nconst recurso = await response.json();'
            }
        ]
    }
];