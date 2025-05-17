/**
 * Datos de la sección: Clase PHP de manejo de respuestas
 */
export default {
  id: "php-respuestas",
  title: "Clase PHP: manejo de respuestas (respuestas.class.php)",
  description:
    "Esta clase contiene respuestas estándar para errores comunes como método no permitido, datos incompletos, falta de autorización o errores del servidor. Al usar esta clase en los controladores, se garantiza una estructura consistente en los mensajes de error que recibe el cliente.",
  hasDetailedPage: true,
  details: {
    overview:
      "La clase 'respuestas' proporciona un formato estandarizado para todas las respuestas de la API, tanto para respuestas exitosas como para errores.",
    code: `<?php
class respuestas {
    public $response = [
        'status' => "ok",
        "result" => array()
    ];

    public function error_405() {
        $this->response['status'] = "error";
        $this->response['result'] = array(
            "error_id" => "405",
            "error_msg" => "Método no permitido"
        );
        return $this->response;
    }

    public function error_200($string = "Datos incorrectos") {
        $this->response['status'] = "error";
        $this->response['result'] = array(
            "error_id" => "200",
            "error_msg" => $string
        );
        return $this->response;
    }

    public function error_400() {
        $this->response['status'] = "error";
        $this->response['result'] = array(
            "error_id" => "400",
            "error_msg" => "Datos enviados incompletos o con formato incorrecto"
        );
        return $this->response;
    }

    public function error_500($string = "Error interno del servidor") {
        $this->response['status'] = "error";
        $this->response['result'] = array(
            "error_id" => "500",
            "error_msg" => $string
        );
        return $this->response;
    }

    public function error_401($string = "No autorizado") {
        $this->response['status'] = "error";
        $this->response['result'] = array(
            "error_id" => "401",
            "error_msg" => $string
        );
        return $this->response;
    }
}`,
    usage: "Esta clase se utiliza en todas las demás clases para estandarizar las respuestas de la API.",
    examples: [
      {
        title: "Respuesta de error por datos incompletos",
        code: `<?php
require_once 'respuestas.class.php';
$_respuestas = new respuestas();

// Verificar si faltan datos
if(!isset($datos['nombre'])) {
    $respuesta = $_respuestas->error_400();
    echo json_encode($respuesta);
    exit;
}`,
      },
      {
        title: "Respuesta de error personalizada",
        code: `<?php
require_once 'respuestas.class.php';
$_respuestas = new respuestas();

// Error personalizado
$respuesta = $_respuestas->error_200("El usuario ya existe en la base de datos");
echo json_encode($respuesta);`,
      },
    ],
  },
}
