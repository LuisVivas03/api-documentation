/**
 * Datos de la sección: Clase PHP de autenticación
 */
export default {
  id: "php-htaccess",
  title: "Htaccess",
  image: "./images/url.png",
  hasDetailedPage: true,
  details: {
    overview:
      "Este archivo configura reglas de reescritura de URLs mediante mod_rewrite, lo que permite URLs más limpias (sin extensiones .php o .html) y un comportamiento tipo “router” para aplicaciones como APIs RESTful.",
    code: `RewriteEngine On

#son para quitar extension .php
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.php -f
RewriteRule ^(.*)$ $1.php

#son para quitar extension .html
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html

#si la ruta no es un archivo existente, ni una carpeta
#redirigir al index

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.+?)/?$ index.php?url=$1 [L,QSA]`,
    usage:
      "Esto permite que en lugar de acceder a login.php, puedas simplemente escribir tudominio.com/login. Si visitas una URL que no corresponde a un archivo o carpeta, se redirige a index.php y se pasa la URL como parámetro url.",
    examples: [
      {
        title: "Supon que tienes un archivo llamado login.php y escribes:",
        code: `http://localhost/login`,
      },
      {
        title: "La regla lo reescribe internamente a:",
        code: `http://localhost/login.php`,
      },
    ],
  },
}