/**
 * Datos de la sección: Clase PHP de autenticación
 */
export default {
  id: "php-config",
  title: "Config",
  image: "./images/config.png",
  hasDetailedPage: true,
  details: {
    overview:
      "Define los párametros para la conexión a la base de datos.",
    code: `{
  "server": "localhost",
  "user": "root",
  "password": "",
  "database": "rest2025",
  "port": "3306"
}
`,
    usage:
      "Para completar la configuración de la conexión debes crear la base de datos e ingresar el mismo nombre que el indicado en el archivo de configuración.",
    examples: [
    ],
  },
}