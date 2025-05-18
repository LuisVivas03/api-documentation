/**
 * Datos de la sección: Clase PHP de manejo de respuestas
 */
export default {
  id: "php-respuestas",
  title: "Manejo de respuestas (respuestas.class.php)",
  image: "./images/respuesta.png",
  hasDetailedPage: true,
  details: {
    overview:
      `Esta clase se encarga de generar respuestas estándar para los errores más comunes que pueden surgir durante el consumo de la API. Proporciona métodos que devuelven estructuras JSON uniformes, lo cual permite mantener una comunicación clara y consistente entre el servidor y el cliente.

Entre los errores gestionados se incluyen:

405:  Método no permitido: Cuando se intenta acceder a un recurso con un método HTTP incorrecto.

400: Datos incompletos o mal formateados: Cuando faltan parámetros requeridos o el formato de los datos no es el esperado.

401: No autorizado: Cuando el token no se encuentra, ha caducado o no es válido.

500: Error interno del servidor: Cuando ocurre una falla inesperada al ejecutar una operación.

200: Datos incorrectos: Utilizado para señalar errores lógicos en la solicitud, aunque la sintaxis sea válida.

El uso de esta clase dentro de los controladores asegura que todas las respuestas de error tengan una estructura predecible (status, result, error_id, error_msg), lo cual facilita el manejo de errores en las aplicaciones cliente y mejora la mantenibilidad del código.`,
    code: `class respuestas {
    public $response = [
        'status' => "ok",
        "result" => array()


    ];

    public function error_405(){
        $this -> response ['status'] = "error";
        $this -> response [ 'result'] = array(
            "error id " => "405",
            "error_msg" => "metodo no permitido"
        );
        return $this -> response;
    }

    public function error_400(){
        $this -> response ['status'] = "error";
        $this -> response [ 'result'] = array(
            "error id " => "405",
            "error_msg" => "Datos enviados incompletos o con formatos incorrectos"
        );
        return $this -> response;
    }

    public function error_401($valor = "No autorizado"){
        $this -> response ['status'] = "error";
        $this -> response [ 'result'] = array(
            "error id " => "401",
            "error_msg" => $valor
        );
        return $this -> response;
    }

    
    public function error_500( $valor = "error intento del servidor"){
        $this -> response ['status'] = "error";
        $this -> response [ 'result'] = array(
            "error id " => "405",
            "error_msg" => "Datos enviados incompletos o con formatos incorrectos"
        );
        return $this -> response;
    }

    public function error_200($valor = "Datos incorrectos"){
        $this -> response ['status'] = "error";
        $this -> response [ 'result'] = array(
            "error id " => "405",
            "error_msg" => $valor
        );
        return $this -> response;
    }

    


}`,
    usage:
      "",
    examples: [
    ],
  },
}
