/**
 * Datos de la sección: Endpoint PHP de login
 */
export default {
  id: "php-login-endpoint",
  title: "Endpoint PHP: login.php",
  description:
    "Este archivo funciona como el punto de entrada para el inicio de sesión. Recibe solicitudes POST, valida usuario y contraseña usando la clase 'auth', y devuelve un token en caso de éxito o un mensaje de error si la autenticación falla.",
  hasDetailedPage: true,
  details: {
    overview:
      "El endpoint de login es el punto de entrada para la autenticación de usuarios en la API. Procesa las solicitudes POST con credenciales de usuario y devuelve un token de acceso si las credenciales son válidas.",
    code: `<?php
require_once 'clases/auth.php';
require_once 'clases/respuestas.class.php';

$_auth = new auth;
$_respuestas = new respuestas;

if($_SERVER['REQUEST_METHOD'] == "POST") {
    // Recibir datos
    $postBody = file_get_contents("php://input");
    
    // Enviar datos al manejador
    $datosArray = $_auth->login($postBody);
    
    // Devolver respuesta
    header('Content-Type: application/json');
    if(isset($datosArray["result"]["error_id"])) {
        $responseCode = $datosArray["result"]["error_id"];
        http_response_code($responseCode);
    } else {
        http_response_code(200);
    }
    echo json_encode($datosArray);
} else {
    header('Content-Type: application/json');
    $datosArray = $_respuestas->error_405();
    echo json_encode($datosArray);
}`,
    usage:
      "Este endpoint se utiliza para autenticar usuarios y obtener un token de acceso válido para realizar operaciones en la API.",
    examples: [
      {
        title: "Solicitud de login con cURL",
        code: `curl -X POST https://api.ejemplo.com/login.php \
-H "Content-Type: application/json" \
-d '{"usuario": "admin", "password": "12345"}'`,
      },
      {
        title: "Solicitud de login con JavaScript",
        code: `fetch('https://api.ejemplo.com/login.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        usuario: 'admin',
        password: '12345'
    })
})
.then(response => response.json())
.then(data => {
    if(data.status === "ok") {
        // Guardar token
        localStorage.setItem('token', data.result.token);
    } else {
        console.error('Error:', data.result.error_msg);
    }
});`,
      },
    ],
  },
}
