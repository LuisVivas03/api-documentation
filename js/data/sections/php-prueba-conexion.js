/**
 * Datos de la sección: Script PHP de prueba de conexión
 */
export default {
  id: "php-prueba-conexion",
  title: "Script PHP: prueba de conexión",
  description:
    "Este archivo prueba la conexión con la base de datos utilizando la clase 'conexion'. Muestra cómo se pueden realizar consultas como INSERT desde PHP. Aunque el código de ejemplo está comentado, sirve como base para ejecutar pruebas SQL rápidamente.",
  hasDetailedPage: true,
  details: {
    overview:
      "Este script de prueba demuestra cómo establecer una conexión con la base de datos y ejecutar consultas SQL básicas utilizando la clase 'conexion'.",
    code: `<?php
require_once 'clases/conexion/conexion.php';

$conexion = new conexion;

// Ejemplo de consulta SELECT
$query = "SELECT * FROM pacientes LIMIT 10";
print_r($conexion->obtenerDatos($query));

// Ejemplo de consulta INSERT (comentado para evitar inserciones accidentales)
/*
$query = "INSERT INTO pacientes (DNI, Nombre, Correo) VALUES ('12345678A', 'Paciente de Prueba', 'prueba@example.com')";
$id = $conexion->nonQueryId($query);
echo "ID del nuevo paciente: " . $id;
*/

// Ejemplo de consulta UPDATE (comentado para evitar modificaciones accidentales)
/*
$query = "UPDATE pacientes SET Nombre = 'Nombre Actualizado' WHERE PacienteId = 1";
$afectados = $conexion->nonQuery($query);
echo "Registros afectados: " . $afectados;
*/`,
    usage:
      "Este script se utiliza principalmente para probar la conexión a la base de datos y verificar que las consultas SQL funcionan correctamente.",
    examples: [
      {
        title: "Ejecutar el script de prueba",
        code: `php prueba_conexion.php`,
      },
    ],
  },
}
