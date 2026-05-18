const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1', 
    user: 'root',      
    password: '',      
    database: 'whiteleafagrifinal'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1); // Stop the server if DB fails
    }
    console.log('Successfully connected to the XAMPP MySQL database.');
});

// Export it so other files can run queries using this connection
module.exports = db;