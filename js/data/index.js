/**
 * Módulo central de datos
 * Importa y exporta todas las secciones de la documentación
 */

// Importar secciones básicas
import introduccion from "./sections/introduccion.js"
import sql from "./sections/sql.js"

// Importar secciones detalladas
import phpConexion from "./sections/php-conexion.js"
import phpAuth from "./sections/php-auth.js"
import phpPacientes from "./sections/php-pacientes.js"
import phpRespuestas from "./sections/php-respuestas.js"
import phpLoginEndpoint from "./sections/php-login-endpoint.js"
import phpPruebaConexion from "./sections/php-prueba-conexion.js"
import phpEndpointPacientes from "./sections/php-endpoint-pacientes.js"
import phpConfig from "./sections/php-config.js"
import phpHtaccess from "./sections/php-htaccess.js"

// Agrupar secciones
const basicSections = [introduccion, sql]

const detailedSections = [
  phpConfig,
  phpHtaccess,
  phpConexion,
  phpAuth,
  phpPacientes,
  phpRespuestas,
  phpLoginEndpoint,
  phpPruebaConexion,
  phpEndpointPacientes
]

// Exportar datos agrupados
export default {
  basicSections,
  detailedSections,

  // Método para obtener todas las secciones
  getAllSections() {
    return [...basicSections, ...detailedSections]
  },

  // Método para buscar una sección por ID
  getSectionById(id) {
    return this.getAllSections().find((section) => section.id === id) || null
  },
}
