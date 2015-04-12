/**
 * Created by widrogo on 11-04-15.
 */
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8000);

console.log("Dirijase a la siguiente direccion: \n");
console.log("localhost:8000");
