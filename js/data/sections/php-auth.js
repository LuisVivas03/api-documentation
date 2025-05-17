/**
 * Datos de la sección: Clase PHP de autenticación
 */
export default {
  id: "php-auth",
  title: "Clase PHP: autenticación (auth.php)",
  image: "./images/login.png",
  description:
    "Esta clase llamada 'auth' se encarga del proceso de inicio de sesión. Verifica si el usuario y contraseña son válidos, encripta la contraseña, consulta los datos del usuario desde la base de datos y, si todo es correcto, genera un token único que se almacena en la tabla 'usuarios_token'.",
  hasDetailedPage: true,
  details: {
    overview:
      "La clase 'auth' maneja todo el proceso de autenticación de usuarios, desde la validación de credenciales hasta la generación de tokens de acceso.",
    code: `<?php
require_once 'conexion/conexion.php';
require_once 'respuestas.class.php';

class auth extends conexion {
    public function login($json) {
        $_respuestas = new respuestas;
        $datos = json_decode($json, true);
        
        if(!isset($datos['usuario']) || !isset($datos['password'])) {
            return $_respuestas->error_400();
        } else {
            $usuario = $datos['usuario'];
            $password = $datos['password'];
            $password = parent::encriptar($password);
            
            $datos = $this->obtenerDatosUsuario($usuario);
            
            if($datos) {
                if($password == $datos[0]['Password']) {
                    $verificar = $this->insertarToken($datos[0]['UsuarioId']);
                    if($verificar) {
                        $result = $_respuestas->response;
                        $result["result"] = array(
                            "token" => $verificar
                        );
                        return $result;
                    } else {
                        return $_respuestas->error_500("Error interno, no se ha podido guardar");
                    }
                } else {
                    return $_respuestas->error_200("El password es inválido");
                }
            } else {
                return $_respuestas->error_200("El usuario $usuario no existe");
            }
        }
    }
    
    private function obtenerDatosUsuario($usuario) {
        $query = "SELECT UsuarioId, Password, Estado FROM usuarios WHERE Usuario = '$usuario'";
        $datos = parent::obtenerDatos($query);
        
        if(isset($datos[0]["UsuarioId"])) {
            return $datos;
        } else {
            return 0;
        }
    }
    
    private function insertarToken($usuarioId) {
        $val = true;
        $token = bin2hex(openssl_random_pseudo_bytes(16, $val));
        $date = date("Y-m-d H:i");
        $estado = "Activo";
        
        $query = "INSERT INTO usuarios_token (UsuarioId, Token, Estado, Fecha) VALUES ('$usuarioId', '$token', '$estado', '$date')";
        $verifica = parent::nonQuery($query);
        
        if($verifica) {
            return $token;
        } else {
            return 0;
        }
    }
}`,
    usage:
      "Esta clase se utiliza principalmente en el endpoint de login para autenticar usuarios y generar tokens de acceso.",
    examples: [
      {
        title: "Proceso de login",
        code: `<?php
require_once 'auth.php';
$auth = new auth();

// Datos recibidos en formato JSON
$json = '{"usuario": "admin", "password": "12345"}';

// Procesar login
$respuesta = $auth->login($json);
echo json_encode($respuesta);`,
      },
    ],
  },
}
