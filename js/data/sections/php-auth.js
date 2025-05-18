/**
 * Datos de la sección: Clase PHP de autenticación
 */
export default {
  id: "php-auth",
  title: "Clase PHP: autenticación (auth.php)",
  description:
    "Descripcion detallada",
  hasDetailedPage: true,
  details: {
    overview:
      `Esta clase llamada auth es responsable de gestionar el proceso de autenticación de usuarios dentro del sistema. Su función principal es validar las credenciales (usuario y contraseña) proporcionadas durante el inicio de sesión. Para ello, primero verifica que los datos requeridos estén presentes, luego encripta la contraseña utilizando el algoritmo MD5 y consulta la base de datos para verificar si existe un usuario con esas credenciales.

En caso de que las credenciales sean correctas, la clase genera un token único (utilizando funciones como bin2hex y random_bytes) que actúa como identificador de sesión. Este token se almacena en la tabla usuarios_token, junto con el ID del usuario y una marca de tiempo. El token será necesario para acceder a recursos protegidos del sistema, asegurando que solo usuarios autenticados puedan realizar operaciones como consultas, inserciones, modificaciones o eliminaciones de datos.

Adicionalmente, esta clase incluye mecanismos para manejar errores comunes como credenciales inválidas o falta de datos, devolviendo respuestas estructuradas que pueden ser interpretadas fácilmente por el cliente o frontend.`,
    code: `require_once 'conexion/conexion.php';
require_once 'respuestas.class.php';
class auth extends conexion{

    public function login($json){
        $_respuestas = new respuestas;
        $datos = json_decode($json, true);
        //inser verifica si un campo esta vacío
        if( !isset($datos['usuario']) || !isset($datos['password'])){
            //datos mal
            return $_respuestas -> error_400();
        }else{
            //todo bien
            $usuario = $datos ['usuario'];
            $password = $datos ['password'];
            $password = parent:: encriptar($password);
            $datos = $this -> obtenerDatosUsuario($usuario);
                if ($datos){
                    //si datos
                    if( $password == $datos [0]['Password']){
                        if( $datos [0]['Estado']== 'Activo'){ 
                            //crear el token
                            $verificar = $this -> insertarToken($datos [0]['UsuarioId']);
                            if($verificar){
                                //si se guarda
                                $result = $_respuestas -> response;
                                $result ["result"] =array(
                                    "token" => $verificar
                                );
                                return $result;
                            }else{
                                //si hubo error al guardar
                                return $_respuestas -> error_500("Error interno, solucionaremos prontamente ");
                            }
                        } else{
                            return $_respuestas -> error_200("Usuario inactivo");
                        }

                    }else{
                        return $_respuestas -> error_200("La contraeña es invalida");
                    }
            }else{
                 return $_respuestas -> error_200(("El usuario $usuario no existe"));
             }
            
        }

    }
    

    public function obtenerDatosUsuario($correo){
        $query = "SELECT UsuarioId, Password, Estado FROM usuarios WHERE Usuario = '$correo'";
        $datos = parent ::obtenerDatos($query);
        if(isset($datos[0]["UsuarioId"])){
            return $datos;
            
        }else{
            return 0;
        }

    }
    public function insertarToken($usuarioid){
        $val = true;
        $token = bin2hex(openssl_random_pseudo_bytes(16, $val));
        $date = date (" y- m - d - H : i ");
        $estado = "Activo";
        $query = "INSERT INTO usuarios_token (UsuarioId, Token, Estado, Fecha)VALUES('$usuarioid', '$token', '$estado', '$date')";
        $verifica = parent :: nonQuery($query);
        if($verifica){
            return $token;
        } else{
            return 0;
        }
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
