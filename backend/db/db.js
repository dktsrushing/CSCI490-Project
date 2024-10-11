// db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost', // Database host
    user: 'testuser', // Database username
    password: 'password', // Database password
    database: 'workout_db', // Database name
    port: 3306  //Port
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = connection;
