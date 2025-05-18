/**
 * Datos de la sección: Script PHP de prueba de conexión
 */
export default {
  id: "php-prueba-conexion",
  title: "Script PHP: prueba de conexión",
  description:
    "Descripcion detallada",
  hasDetailedPage: true,
  details: {
    overview:
      `Este archivo tiene como propósito verificar el correcto funcionamiento de la conexión a la base de datos mediante el uso de la clase conexion. Sirve como script de prueba para confirmar que las credenciales, el host y otros parámetros de conexión están configurados adecuadamente.

Dentro del archivo, se incluye un ejemplo comentado de una sentencia SQL INSERT, lo que demuestra cómo se pueden realizar operaciones de escritura en la base de datos directamente desde PHP utilizando los métodos disponibles en la clase conexion.

Aunque el bloque de código está desactivado (comentado), su presencia permite a los desarrolladores realizar pruebas rápidas de sentencias SQL sin necesidad de implementar una interfaz completa, lo que resulta útil en etapas tempranas de desarrollo o depuración.`,
    code: `require_once "clases/conexion/conexion.php";

$conexion = new conexion;

/*$query = "INSERT INTO pacientes (ONI) value ('5')";


echo ('<pre>');
print_r($conexion -> nonQuery($query));
echo('<pre>');*/`,
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
