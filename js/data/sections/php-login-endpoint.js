/**
 * Datos de la sección: Endpoint PHP de login
 */
export default {
  id: "php-login-endpoint",
  title: "Endpoint PHP: login.php",
  description:
    "Descripcion detallada",
  hasDetailedPage: true,
  details: {
    overview:
      `Este archivo PHP actúa como el punto de entrada principal para el proceso de autenticación en el sistema. Está diseñado para recibir exclusivamente solicitudes HTTP mediante el método POST. Al recibir una petición, obtiene el cuerpo de la solicitud en formato JSON, lo analiza y lo envía a la clase auth para que realice la validación del usuario y contraseña.

Si las credenciales son correctas, se genera un token único que se devuelve al cliente como parte de la respuesta. Este token es necesario para acceder a los demás recursos protegidos de la API, funcionando como un mecanismo de autenticación y autorización.

En caso de error (como credenciales inválidas, formato incorrecto o métodos HTTP no permitidos), el archivo retorna una respuesta estructurada en formato JSON, utilizando los mensajes definidos en la clase respuestas, junto con el código de estado HTTP correspondiente. Esto asegura una comunicación clara, estandarizada y segura entre el cliente y el servidor.`,
    code: `require_once 'clases/auth.class.php';
    require_once 'clases/respuestas.class.php';
    $_auth=new auth;
    $_respuestas= new respuestas;
    if ($_SERVER['REQUEST_METHOD'] == "POST"){
        $postBody = file_get_contents("php://input");
        $datosArray =$_auth->login($postBody);


        //devolvemos una respuesta 
        header('content-type: application/json');
        if(isset($datosArray["result"]["error_id"])){
            $responseCode = $datosArray["result"]["error_id"];
            http_response_code($responseCode);
        }else{
            http_response_code(200);
        }

        echo json_encode($datosArray);
    }else {
        header ('content-type: application/json');
        $datosArray = $_respuestas->error_405();
        echo json_encode($datosArray);
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
