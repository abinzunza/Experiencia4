# CRUD-CodeIgniter-Node
Repositorio para mostrar CRUD (Create, Read, Update, Delete) desde CodeIgniter (PHP) y Node.JS

# Requisitos
1. Tener instalado [WAMP Server](http://www.wampserver.com/).
2. Tener instalado [Git](https://git-scm.com/downloads).
3. Tener instalado [NodeJS](https://nodejs.org/en/download/current/).
4. Tener instalado Bower:
`npm install -g bower`

# Instalación general
1. Descargar repositorio desde GitHub: `git clone https://github.com/MiguelGonzalezAravena/CRUD-CodeIgniter-Node.git`
2. Abrir [PHPMyAdmin](http://127.0.0.1/phpmyadmin/).
3. Crear una base de datos llamada `crud`.
4. Importar el archivo que se encuentra en `/db/asignaturas.sql`.

# Instalación CodeIgniter
1. Iniciar el servicio de WAMP Server.
2. Abrir consola y cambiar a la carpeta `www` de WAMP Server: `cd C:/wamp/www`
3. Cambiar a la carpeta del proyecto en CodeIgniter: `cd CRUD-CodeIgniter-Node/CodeIgniter/`
4. Instalar dependencias: `bower install`
5. Ingresar mediante el navegador al siguiente enlace:
[Clic aquí](http://127.0.0.1/CRUD-CodeIgniter-Node/CodeIgniter/)

# Instalación Node.JS
1. Abrir consola y cambiar a la carpeta `www` de WAMP Server: `cd C:/wamp/www`
2. Cambiar a la carpeta del proyecto en Node.JS: `cd CRUD-CodeIgniter-Node/Node.JS/`
3. Instalar dependencias: `bower install && npm install`
4. Ingresar mediante el navegador al siguiente enlace:
[Clic aquí](http://127.0.0.1:3000/)