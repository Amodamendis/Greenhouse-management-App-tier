const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '192.168.96.1', // Your WSL-to-Windows bridge IP
    user: 'root',      
    password: '',      
    database: 'whiteleafagrifinal'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1); 
    }
    console.log('Successfully connected to the XAMPP MySQL database.');
});

module.exports = db;