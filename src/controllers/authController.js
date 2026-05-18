const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Translates: register.php
exports.register = async (req, res) => {
    const { fullname, email, username, password } = req.body;

    // 1. Check if email already exists
    db.query('SELECT email FROM Customer WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length > 0) return res.status(400).json({ error: 'Email already registered' });

        try {
            // 2. Hash the password securely
            const hashedPassword = await bcrypt.hash(password, 10);

            // 3. Insert new customer
            const insertQuery = 'INSERT INTO Customer (name, email, username, password) VALUES (?, ?, ?, ?)';
            db.query(insertQuery, [fullname, email, username, hashedPassword], (err, result) => {
                if (err) return res.status(500).json({ error: 'Failed to register user' });
                res.status(201).json({ message: 'Registration successful!' });
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error during registration' });
        }
    });
};

// Translates: loginandsignup.php
exports.login = (req, res) => {
    const { username, password } = req.body;

    // 1. Find the user
    db.query('SELECT * FROM Customer WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(401).json({ error: 'Invalid username or password' });

        const user = results[0];

        try {
            // 2. Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ error: 'Invalid username or password' });

            // 3. Log the login event into the journey table (Retained from your PHP logic)
            db.query('INSERT INTO journey (username) VALUES (?)', [username], (err) => {
                if (err) console.error('Journey tracking error:', err);
            });

            // 4. Generate a JWT token for the frontend to use
            // Note: In production, 'your_jwt_secret' goes into a .env file
            const token = jwt.sign(
                { id: user.id, username: user.username }, 
                'your_jwt_secret', 
                { expiresIn: '24h' }
            );

            res.json({ 
                message: 'Login successful!', 
                token, 
                user: { id: user.id, username: user.username, name: user.name } 
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error during login' });
        }
    });
};