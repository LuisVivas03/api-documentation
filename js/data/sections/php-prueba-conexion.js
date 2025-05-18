/**
 * Datos de la sección: Script PHP de prueba de conexión
 */
export default {
  id: "php-prueba-conexion",
  title: "Prueba de conexión (index.php)",
  image: "./images/prueba.png",
  hasDetailedPage: true,
  details: {
    overview:
      `Este archivo tiene como propósito verificar el correcto funcionamiento de la conexión a la base de datos mediante el uso de la clase conexion. Sirve como script de prueba para confirmar que las credenciales, el host y otros parámetros de conexión están configurados adecuadamente.

Dentro del archivo, se incluye un ejemplo comentado de una sentencia SQL INSERT, lo que demuestra cómo se pueden realizar operaciones de escritura en la base de datos directamente desde PHP utilizando los métodos disponibles en la clase conexion.`,
    code: `require_once "clases/conexion/conexion.php";

$conexion = new conexion;

`,
    usage:
      "",
    examples: [
    ],
  },
}
