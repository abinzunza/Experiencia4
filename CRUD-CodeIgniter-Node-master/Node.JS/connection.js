/*
* @Author: Miguel González Aravena
* @Email: miguel.gonzalez.93@gmail.com
* @Github: https://github.com/MiguelGonzalezAravena
* @Date: 2016-12-04 23:29:15
* @Last Modified by: Miguel GonzÃ¡lez Aravena
* @Last Modified time: 2016-12-04 23:29:58
*/
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'crud'
});

module.exports = connection;