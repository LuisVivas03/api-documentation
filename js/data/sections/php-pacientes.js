/**
 * Datos de la sección: Clase PHP de gestión de pacientes
 */
export default {
  id: "php-pacientes",
  title: "Clase PHP: gestión de pacientes (pacientes.php)",
  description:
    "Esta clase se encarga de gestionar los datos de los pacientes. Permite listar, obtener, crear, actualizar o eliminar registros de pacientes en la base de datos. Para realizar cualquier operación se requiere un token de autenticación válido, lo que garantiza la seguridad del acceso.",
  hasDetailedPage: true,
  details: {
    overview:
      "La clase 'pacientes' proporciona todas las funcionalidades necesarias para gestionar los datos de pacientes en la base de datos, incluyendo operaciones CRUD (Crear, Leer, Actualizar, Eliminar).",
    code: `<?php
require_once "conexion/conexion.php";
require_once "respuestas.class.php";

class pacientes extends conexion {
    private $table = "pacientes";
    private $pacienteid = "";
    private $dni = "";
    private $nombre = "";
    private $direccion = "";
    private $codigoPostal = "";
    private $telefono = "";
    private $genero = "";
    private $fechaNacimiento = "0000-00-00";
    private $correo = "";
    private $token = "";

    public function listaPacientes($pagina = 1) {
        $inicio = 0;
        $cantidad = 100;
        if($pagina > 1) {
            $inicio = ($cantidad * ($pagina - 1)) + 1;
            $cantidad = $cantidad * $pagina;
        }
        $query = "SELECT PacienteId, Nombre, DNI, Telefono, Correo FROM " . $this->table . " limit $inicio, $cantidad";
        $datos = parent::obtenerDatos($query);
        return ($datos);
    }

    public function obtenerPaciente($id) {
        $query = "SELECT * FROM " . $this->table . " WHERE PacienteId = '$id'";
        return parent::obtenerDatos($query);
    }

    public function post($json) {
        $_respuestas = new respuestas;
        $datos = json_decode($json, true);

        if(!isset($datos['token'])) {
            return $_respuestas->error_401();
        } else {
            $this->token = $datos['token'];
            $arrayToken = $this->buscarToken();
            if($arrayToken) {
                if(!isset($datos['nombre']) || !isset($datos['dni']) || !isset($datos['correo'])) {
                    return $_respuestas->error_400();
                } else {
                    $this->nombre = $datos['nombre'];
                    $this->dni = $datos['dni'];
                    $this->correo = $datos['correo'];
                    if(isset($datos['telefono'])) { $this->telefono = $datos['telefono']; }
                    if(isset($datos['direccion'])) { $this->direccion = $datos['direccion']; }
                    if(isset($datos['codigoPostal'])) { $this->codigoPostal = $datos['codigoPostal']; }
                    if(isset($datos['genero'])) { $this->genero = $datos['genero']; }
                    if(isset($datos['fechaNacimiento'])) { $this->fechaNacimiento = $datos['fechaNacimiento']; }
                    
                    $resp = $this->insertarPaciente();
                    if($resp) {
                        $respuesta = $_respuestas->response;
                        $respuesta["result"] = array(
                            "pacienteId" => $resp
                        );
                        return $respuesta;
                    } else {
                        return $_respuestas->error_500();
                    }
                }
            } else {
                return $_respuestas->error_401("El Token que envió es inválido o ha caducado");
            }
        }
    }

    private function insertarPaciente() {
        $query = "INSERT INTO " . $this->table . " (DNI, Nombre, Direccion, CodigoPostal, Telefono, Genero, FechaNacimiento, Correo)
        values
        ('" . $this->dni . "','" . $this->nombre . "','" . $this->direccion . "','" . $this->codigoPostal . "','" . $this->telefono . "','" . $this->genero . "','" . $this->fechaNacimiento . "','" . $this->correo . "')";
        $resp = parent::nonQueryId($query);
        if($resp) {
            return $resp;
        } else {
            return 0;
        }
    }

    private function buscarToken() {
        $query = "SELECT TokenId, UsuarioId, Estado FROM usuarios_token WHERE Token = '" . $this->token . "' AND Estado = 'Activo'";
        $resp = parent::obtenerDatos($query);
        if($resp) {
            return $resp;
        } else {
            return 0;
        }
    }

    // Métodos para actualizar y eliminar pacientes...
}`,
    usage:
      "Esta clase se utiliza en el endpoint de pacientes para realizar operaciones CRUD sobre los registros de pacientes.",
    examples: [
      {
        title: "Listar pacientes",
        code: `<?php
require_once 'pacientes.php';
$pacientes = new pacientes();
$listado = $pacientes->listaPacientes(1); // Página 1
echo json_encode($listado);`,
      },
      {
        title: "Crear un paciente",
        code: `<?php
require_once 'pacientes.php';
$pacientes = new pacientes();

$json = '{
    "nombre": "Juan Pérez",
    "dni": "12345678A",
    "correo": "juan@example.com",
    "telefono": "123456789",
    "token": "a1b2c3d4e5f6g7h8i9j0"
}';

$respuesta = $pacientes->post($json);
echo json_encode($respuesta);`,
      },
    ],
  },
}
