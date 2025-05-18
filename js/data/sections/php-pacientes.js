/**
 * Datos de la sección: Clase PHP de gestión de pacientes
 */
export default {
  id: "php-pacientes",
  title: "Clase PHP: gestión de pacientes (pacientes.php)",
  description:
    "Descripcion detallada",
  hasDetailedPage: true,
  details: {
    overview:
      `Esta clase se encarga de gestionar toda la lógica relacionada con el manejo de los datos de los pacientes dentro del sistema. Implementa métodos para realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre los registros de la tabla pacientes en la base de datos.

Permite:

Listar pacientes mediante paginación para optimizar la carga de datos.

Obtener los detalles de un paciente específico a partir de su PacienteId.

Crear nuevos registros de pacientes verificando que se hayan enviado los campos obligatorios.

Actualizar registros existentes si se proporciona un pacienteId y un token válido.

Eliminar un paciente, acción que también requiere autenticación previa.

Todas las operaciones sensibles, como la creación, modificación o eliminación de datos, requieren un token de autenticación activo. Este token se valida contra la tabla usuarios_token, garantizando que solo usuarios autorizados puedan acceder a estos métodos.

Además, la clase gestiona correctamente los posibles errores (por ejemplo, datos incompletos, tokens inválidos o fallos internos del servidor), devolviendo respuestas estandarizadas y apropiadas para cada caso.`,
    code: `require_once 'conexion/conexion.php';
require_once 'respuestas.class.php';

class pacientes extends conexion{
    private $pacienteId= "";
    private $dni = "";
    private $nombre = "";
    private $direccion = "";
    private $codigoPostal= "";
    private $genero = "";
    private $telefono = "";
    private $fechaNacimiento = "0000-00-00";
    private $correo = "";
    private $table = "pacientes";
    private $token = "";

    //dba2641a11b462d567b7fcd3e37ffe43

    public function listaPacientes($pagina = 1){
        $inicio =0;
        $cantidad =100;
        if ($pagina >1) {
            $inicio =($cantidad*($pagina-1))+1;   
            $cantidad = $cantidad * $pagina; 
        }

        $query = "SELECT PacienteId, Nombre, DNI, Telefono, Correo FROM pacientes limit $inicio, $cantidad";
        $datos = parent::obtenerDatos($query);
        return $datos;
    }

    public function obtenerPaciente($id){
        $query = "SELECT * FROM pacientes WHERE PacienteId = '$id'";       
        return parent::obtenerDatos($query);
    }

    public function post($json){
        $_respuestas = new respuestas;
        $datos = json_decode($json, true);

        if(!isset($datos['token'])){
            return $_respuestas->error_401(); 
        }else{
            $this-> token = $datos['token'];
            $arrayToken = $this->buscarToken();
            if($arrayToken){
                if (!isset($datos['nombre']) || !isset($datos['dni']) || !isset($datos['correo'])) {
                    return $_respuestas->error_400();
                }else {
                    $this -> nombre = $datos['nombre'];
                    $this -> dni = $datos['dni'];
                    $this -> correo = $datos['correo'];
                    if (isset ($datos ['telefono'])){$this -> telefono = $datos['telefono'];}
                    if (isset ($datos ['direccion'])){$this -> direccion = $datos['direccion'];}
                    if (isset ($datos ['codigPostal'])){$this -> codigoPostal = $datos['codigoPostal'];}
                    if (isset ($datos ['genero'])){$this -> genero = $datos['genero'];}
                    if (isset ($datos ['fechaNacimiento'])){$this -> fechaNacimiento = $datos['fechaNacimiento'];}
                    $resp = $this -> insertarPaciente();
                    if($resp){
                        $respuesta =$_respuestas->response ;
                        $respuesta ["result"]=array (
                            "pacienteId" =>$resp
                        );
                        return $respuesta;
                    }else{
                        return $_respuestas ->error_500();
                    }
            
                    
                }

            }else{
                return $_respuestas->error_401("el token que envio es invalid o caduco");
            }
        }
    
    }

    public function put($json){
        $_respuestas = new respuestas;
        $datos = json_decode($json, true);

        if(!isset($datos['token'])){
            return $_respuestas->error_401(); 
        }else{
            $this-> token = $datos['token'];
            $arrayToken = $this->buscarToken();
            if($arrayToken){
                if (!isset($datos['pacienteId'])) {
                    return $_respuestas->error_400();
                } else {
                    $this->pacienteId = $datos['pacienteId'];
                    if (isset($datos['nombre'])) { $this->nombre = $datos['nombre']; }
                    if (isset($datos['dni'])) { $this->dni = $datos['dni']; }
                    if (isset($datos['correo'])) { $this->correo = $datos['correo']; }
                    if (isset($datos['telefono'])) { $this->telefono = $datos['telefono']; }
                    if (isset($datos['direccion'])) { $this->direccion = $datos['direccion']; }
                    if (isset($datos['codigoPostal'])) { $this->codigoPostal = $datos['codigoPostal']; }
                    if (isset($datos['genero'])) { $this->genero = $datos['genero']; }
                    if (isset($datos['fechaNacimiento'])) { $this->fechaNacimiento = $datos['fechaNacimiento']; }
            
                    $resp = $this->modificarPaciente();
                    if ($resp) {
                        $respuesta = $_respuestas->response;
                        $respuesta["result"] = array(
                            "pacienteId" => $this->pacienteId
                        );
                        return $respuesta;
                    } else {
                        return $_respuestas->error_500();
                    }
                }

            }else{
                return $_respuestas->error_401("el token que envio es invalid o caduco");
            }
        }
    

    }


    private function insertarPaciente(){
        $query = "INSERT INTO $this->table (DNI, Nombre,  Direccion, CodigoPostal, Telefono, Genero, FechaNacimiento, Correo)
        VALUES ('".$this->dni."','".$this->nombre."','".$this->direccion."','".$this->codigoPostal."','".
                $this->telefono."','".$this->genero."','".$this->fechaNacimiento."','".$this->correo."')";
        $resp = parent::nonQueryid($query);
        if ($resp){
            return $resp;
        }else{
            return 0; 
        }
        
        
    }

    private function modificarPaciente(){
        $query = "UPDATE $this->table SET ";
    
        if ($this->nombre != "") { $query .= "Nombre = '".$this->nombre."',"; }
        if ($this->dni != "") { $query .= "DNI = '".$this->dni."',"; }
        if ($this->correo != "") { $query .= "Correo = '".$this->correo."',"; }
        if ($this->telefono != "") { $query .= "Telefono = '".$this->telefono."',"; }
        if ($this->direccion != "") { $query .= "Direccion = '".$this->direccion."',"; }
        if ($this->codigoPostal != "") { $query .= "CodigoPostal = '".$this->codigoPostal."',"; }
        if ($this->genero != "") { $query .= "Genero = '".$this->genero."',"; }
        if ($this->fechaNacimiento != "0000-00-00") { $query .= "FechaNacimiento = '".$this->fechaNacimiento."',"; }
    

        $query = rtrim($query, ',');
    
        $query .= " WHERE PacienteId = '".$this->pacienteId."'";
    
        $resp = parent::nonQuery($query);
        if ($resp >= 1) {
            return $resp;
        } else {
            return 0;
        }
    }

    public function delete($json){
        $_respuestas = new respuestas;
        $datos = json_decode($json, true);

        if(!isset($datos['token'])){
            return $_respuestas->error_401(); 
        }else{
            $this-> token = $datos['token'];
            $arrayToken = $this->buscarToken();
            if($arrayToken){
                if(!isset($datos['pacienteId'])){
                    return $_respuestas->error_400();
                }else{
                    $this->pacienteId = $datos['pacienteId'];
                    $resp = $this->eliminarPaciente();
                    if($resp){
                        $respuesta = $_respuestas->response;
                        $respuesta["result"] = array(
                            "pacienteId" => $this->pacienteId
                        );
                        return $respuesta;
                    }else{
                        return $_respuestas->error_500();
                    }
                }
            }else{
                return $_respuestas->error_401("el token que envio es invalid o caduco");
            }
        }
    
    }




    public function eliminarPaciente(){
        $query = "DELETE FROM " .$this->table . " WHERE pacienteId= '" . $this->pacienteId . "'";
        $resp = parent::nonQuery($query);
        if($resp>=1){
            return $resp;  
        }else{
            return 0;
        }
    }

    public function buscarToken(){
        $query = "SELECT TokenId, UsuarioId, Estado from usuarios_token  WHERE Token ='" . $this->token .
        "' AND Estado = 'Activo'";
        $resp = parent::obtenerDatos($query);
        if($resp){
            return $resp;
        }else{
            return 0;
        }
    }

    public function actualizarToken($token){
        $date = date("Y-m-d H:i");
        $query = "UPDATE usuarios_token SET Fecha = '$date' WHERE TokenId = '$token' ";
        $resp = parent:: nonQuery($query);
        if($resp){
            return $resp;
        }else{
            return 0;
        }
    }
}`,
    usage:
      "Se utiliza la herramienta Postman para realizar pruebas de la API. Para crear un nuevo paciente, modificar o eliminar se debe autenticar primero y luego enviar a la URL el token de autenticación en el cuerpo de la solicitud POST, PUT o DELETE.",
    examples: [
      {
        title: `GET-Obtener lista de pacientes<br>
        /pacientes?page=1 → Lista paginada<br>
        /pacientes?id=1   → Datos de un paciente<br>
`,
        code: `URL: http://localhost/pacientes?page=1`,
      },
      {
        title: "Respuesta esperada:",
        code: `    {
        "PacienteId": "1",
        "Nombre": "Juan Carlos Medina",
        "DNI": "A000000001",
        "Telefono": "633281515",
        "Correo": "Paciente1@gmail.com"
    }`,
      },
      {
        title: `POST-Crear paciente<br>
        Metodo: POST<br>
        Body (raw/JSON):`,
        code: `{
  "token": "29e7351ed529a249c7641822dc00f258",
  "dni": "11122233",
  "nombre": "Carlos Gómez",
  "correo": "carlos@example.com",
  "telefono": "321654987"
}`,
      },
      {
        title: "Respuesta esperada:",
        code: `{
    "status": "ok",
    "result": {
        "pacienteId": 7
    }
}`,
      },
      {
        title:`PUT-Actualizar paciente<br>
        URL: http://localhost/pacientes<br>
        Body (raw/JSON):`,
        code: `{
  "token": "29e7351ed529a249c7641822dc00f258",
  "pacienteId": 5,
  "nombre": "Carlos G. Actualizado",
  "telefono": "123123123"
}
`
      },
      {
        title: "Respuesta esperada:",
        code: `{
    "status": "ok",
    "result": {
        "pacienteId": 5
    }
}`
      },
      {
        title: `DELETE-Eliminar paciente<br>
        URL: http://localhost/pacientes<br>
        Body (raw/JSON):`,
        code: `{
  "token": "29e7351ed529a249c7641822dc00f258",
  "pacienteId": 5
}`
      },
      {
        title: "Respuesta esperada:",
        code: `{
    "status": "ok",
    "result": {
        "pacienteId": 5
    }
}`
      }


    ],
  },
}
