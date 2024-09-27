const mysql = require('mysql2');

// Crear la conexión a la base de datos
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_management'
});

// Exportar la conexión
module.exports = pool.promise();
