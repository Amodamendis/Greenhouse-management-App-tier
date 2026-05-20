const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST: User sends a message (From About Us page)
router.post('/', (req, res) => {
    const { first_name, last_name, email, phone, country, message } = req.body;
    const sql = "INSERT INTO contacts (first_name, last_name, email, phone, country, message) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [first_name, last_name, email, phone, country, message], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Message sent!" });
    });
});

// GET: Admin views messages
router.get('/', (req, res) => {
    db.query("SELECT * FROM contacts ORDER BY created_at DESC", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// DELETE: Admin clears messages
router.delete('/clear', (req, res) => {
    db.query("TRUNCATE TABLE contacts", (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Messages cleared" });
    });
});

module.exports = router;