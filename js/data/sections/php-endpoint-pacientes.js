/**
 * Datos de la sección: Endpoint PHP de pacientes
 */
export default {
  id: "php-endpoint-pacientes",
  title: "Endpoint PHP: pacientes.php",
  description:
    "Este archivo funciona como el endpoint REST que permite interactuar con los datos de los pacientes. Maneja los métodos HTTP GET, POST, PUT y DELETE para listar, crear, actualizar o eliminar pacientes según los datos recibidos. Requiere token de autenticación para ciertas operaciones como POST, PUT y DELETE.",
  hasDetailedPage: true,
  details: {
    overview:
      "El endpoint de pacientes proporciona una interfaz RESTful para gestionar los datos de pacientes en la base de datos. Soporta operaciones CRUD a través de diferentes métodos HTTP.",
    code: `<?php
require_once 'clases/pacientes.php';
require_once 'clases/respuestas.class.php';

$_respuestas = new respuestas;
$_pacientes = new pacientes;

// Determinar el método HTTP utilizado
if($_SERVER['REQUEST_METHOD'] == "GET") {
    // Obtener parámetros
    if(isset($_GET['page'])) {
        $pagina = $_GET['page'];
        $listaPacientes = $_pacientes->listaPacientes($pagina);
        header("Content-Type: application/json");
        echo json_encode($listaPacientes);
        http_response_code(200);
    } else if(isset($_GET['id'])) {
        $pacienteId = $_GET['id'];
        $datosPaciente = $_pacientes->obtenerPaciente($pacienteId);
        header("Content-Type: application/json");
        echo json_encode($datosPaciente);
        http_response_code(200);
    }
} else if($_SERVER['REQUEST_METHOD'] == "POST") {
    // Recibir datos
    $postBody = file_get_contents("php://input");
    
    // Enviar datos al manejador
    $datosArray = $_pacientes->post($postBody);
    
    // Devolver respuesta
    header('Content-Type: application/json');
    if(isset($datosArray["result"]["error_id"])) {
        $responseCode = $datosArray["result"]["error_id"];
        http_response_code($responseCode);
    } else {
        http_response_code(200);
    }
    echo json_encode($datosArray);
} else if($_SERVER['REQUEST_METHOD'] == "PUT") {
    // Recibir datos
    $postBody = file_get_contents("php://input");
    
    // Enviar datos al manejador
    $datosArray = $_pacientes->put($postBody);
    
    // Devolver respuesta
    header('Content-Type: application/json');
    if(isset($datosArray["result"]["error_id"])) {
        $responseCode = $datosArray["result"]["error_id"];
        http_response_code($responseCode);
    } else {
        http_response_code(200);
    }
    echo json_encode($datosArray);
} else if($_SERVER['REQUEST_METHOD'] == "DELETE") {
    // Recibir datos
    $postBody = file_get_contents("php://input");
    
    // Enviar datos al manejador
    $datosArray = $_pacientes->delete($postBody);
    
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
      "Este endpoint se utiliza para realizar operaciones CRUD sobre los registros de pacientes en la base de datos.",
    examples: [
      {
        title: "Obtener lista de pacientes",
        code: `curl -X GET https://api.ejemplo.com/pacientes.php?page=1`,
      },
      {
        title: "Obtener un paciente específico",
        code: `curl -X GET https://api.ejemplo.com/pacientes.php?id=123`,
      },
      {
        title: "Crear un nuevo paciente",
        code: `curl -X POST https://api.ejemplo.com/pacientes.php \
-H "Content-Type: application/json" \
-d '{
    "nombre": "Juan Pérez",
    "dni": "12345678A",
    "correo": "juan@example.com",
    "telefono": "123456789",
    "token": "a1b2c3d4e5f6g7h8i9j0"
}'`,
      },
    ],
  },
}
