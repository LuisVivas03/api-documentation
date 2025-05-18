/**
 * Datos de la sección: Clase PHP de conexión a base de datos
 */
export default {
  id: "php-conexion",
  title: "Clase PHP: conexión a base de datos",
  description:
    "Descripcion detallada",
  hasDetailedPage: true,
  details: {
    overview:
      `Esta clase PHP llamada conexion permite establecer una conexión segura con una base de datos MySQL, utilizando credenciales como el host, usuario, contraseña y nombre de la base de datos, que son obtenidas dinámicamente desde un archivo de configuración en formato JSON. Esto permite una mayor flexibilidad y seguridad al evitar exponer directamente las credenciales en el código fuente.

  Una vez establecida la conexión, la clase proporciona métodos reutilizables para ejecutar consultas SQL de distintos tipos, tales como:

obtenerDatos($sql): para ejecutar sentencias SELECT y devolver los resultados en formato de arreglo asociativo.

nonQuery($sql): para ejecutar sentencias INSERT, UPDATE o DELETE, devolviendo la cantidad de filas afectadas.

nonQueryId($sql): similar al anterior, pero adicionalmente retorna el ID del último registro insertado, útil en operaciones con claves primarias autoincrementales.

Además, la clase incorpora utilidades como encriptar($string), que permite cifrar datos sensibles (como contraseñas) utilizando el algoritmo MD5. Aunque MD5 no es recomendado para seguridad de alto nivel, puede ser útil en entornos controlados o con fines académicos.

Finalmente, se asegura que la comunicación entre PHP y la base de datos se realice con codificación UTF-8, lo que previene errores de compatibilidad con caracteres especiales, acentos o símbolos utilizados en nombres y descripciones. Esto es especialmente importante en aplicaciones multilingües o con usuarios de diferentes regiones.`,
    code: `class conexion{

    private $server;
    private $user;
    private $password;
    private $database;
    private $port;
    private $conexion;

    function __construct(){
        $listadatos = $this->datosConexion();
        foreach($listadatos as $key => $value){
            $this->server = $value['server'];
            $this->user = $value['user'];
            $this->password = $value['password'];
            $this->database = $value['database'];
            $this->port = $value['port'];
        }
        $this->conexion = new mysqli($this->server,$this->user,$this->password,$this->database,$this->port);
        if($this->conexion->connect_errno){
            echo "Va mal la conexión";
        }
    }
    
    private function datosConexion(){
        $direccion = dirname(__FILE__);
        $jsondata = file_get_contents($direccion . "/" . "config");
        return json_decode($jsondata, true); # En esta linea convierto el json en un array para manejarlo mejor
    }

    private function convertirUTF8($array){
        array_walk_recursive($array,function(&$item,$key){
            if(!mb_detect_encoding($item, 'utf-8', true)){
                $item = utf8_encode($item);
            }
        });
        return $array;
    }

    public function obtenerDatos($sqlstr){
        $results = $this->conexion->query($sqlstr);
        $resultArray = array();
        foreach($results as $key){
            $resultArray[] = $key;
        }
        return $this->convertirUTF8($resultArray);
    }
    public function nonQuery($sqlstr){
        $results = $this -> conexion-> query($sqlstr);
        return $this -> conexion -> affected_rows;
    }


//para insertar 
    public function nonQueryid($sqlstr){
        $results = $this -> conexion -> query ($sqlstr);
        $filas = $this ->conexion -> affected_rows;
        if ($filas >=1) {
            return $this -> conexion -> insert_id;
        }
        return 0;

    }
    protected function encriptar ($string){
        return md5($string);
    }
}`,
    usage:
      "PONER COMO SE USA",
    examples: [
      {
        title: "EJEMPLO",
        code: `PONER CODIGO`,
      },
      {
        title: "EJEMPLO",
        code: `PONER CODIGO`,
      },
    ],
  },
}

