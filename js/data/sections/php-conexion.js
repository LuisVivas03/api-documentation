/**
 * Datos de la sección: Clase PHP de conexión a base de datos
 */
export default {
  id: "php-conexion",
  title: "Clase PHP: conexión a base de datos",
  description:
    "Esta clase PHP llamada 'conexion' permite establecer una conexión con una base de datos MySQL utilizando credenciales obtenidas desde un archivo de configuración JSON. Además, contiene métodos para ejecutar consultas (SELECT, INSERT, UPDATE, DELETE), encriptar datos con MD5 y asegurar la codificación UTF-8.",
  hasDetailedPage: true,
  details: {
    overview:
      "La clase 'conexion' es fundamental para la interacción con la base de datos MySQL. Proporciona métodos seguros para realizar consultas y gestionar la conexión.",
    code: `<?php
class conexion {
    private $server;
    private $user;
    private $password;
    private $database;
    private $port;
    private $conexion;

    function __construct() {
        $listadatos = $this->datosConexion();
        foreach ($listadatos as $key => $value) {
            $this->server = $value['server'];
            $this->user = $value['user'];
            $this->password = $value['password'];
            $this->database = $value['database'];
            $this->port = $value['port'];
        }
        $this->conexion = new mysqli($this->server,$this->user,$this->password,$this->database,$this->port);
        if($this->conexion->connect_errno){
            echo "Error en la conexión";
            die();
        }
    }

    private function datosConexion() {
        $direccion = dirname(__FILE__);
        $jsondata = file_get_contents($direccion . "/" . "config");
        return json_decode($jsondata, true);
    }

    private function convertirUTF8($array) {
        array_walk_recursive($array, function(&$item,$key){
            if(!mb_detect_encoding($item,'utf-8',true)){
                $item = utf8_encode($item);
            }
        });
        return $array;
    }

    public function obtenerDatos($sqlstr) {
        $results = $this->conexion->query($sqlstr);
        $resultArray = array();
        foreach ($results as $key) {
            $resultArray[] = $key;
        }
        return $this->convertirUTF8($resultArray);
    }

    public function nonQuery($sqlstr) {
        $results = $this->conexion->query($sqlstr);
        return $this->conexion->affected_rows;
    }

    public function nonQueryId($sqlstr) {
        $results = $this->conexion->query($sqlstr);
        $filas = $this->conexion->affected_rows;
        if($filas >= 1){
            return $this->conexion->insert_id;
        }else{
            return 0;
        }
    }

    protected function encriptar($string) {
        return md5($string);
    }
}`,
    usage:
      "Para utilizar esta clase, primero debes crear una instancia y luego llamar a sus métodos según sea necesario. Asegúrate de tener un archivo de configuración JSON con los datos de conexión a la base de datos.",
    examples: [
      {
        title: "Consultar datos",
        code: `<?php
require_once 'conexion.php';
$conexion = new conexion();
$query = "SELECT * FROM pacientes";
$datos = $conexion->obtenerDatos($query);
print_r($datos);`,
      },
      {
        title: "Insertar datos",
        code: `<?php
require_once 'conexion.php';
$conexion = new conexion();
$query = "INSERT INTO pacientes (nombre, apellido, email) VALUES ('Juan', 'Pérez', 'juan@example.com')";
$id = $conexion->nonQueryId($query);
echo "ID insertado: " . $id;`,
      },
    ],
  },
}

