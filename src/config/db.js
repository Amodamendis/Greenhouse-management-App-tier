const mysql = require('mysql2');

// Create the connection pool reading dynamically from the environment
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'greenhouse_db',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// --- X-RAY VISION: PROVE THE CONNECTION ON BOOT ---
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ DATABASE CONNECTION FAILED:');
        console.error(err);
    } else {
        console.log('✅ DATABASE CONNECTED SUCCESSFULLY!');
        console.log(`📡 Target Host: ${process.env.DB_HOST}`);
        console.log(`📁 Target DB: ${process.env.DB_NAME}`);
        connection.release();
    }
});


module.exports = pool;