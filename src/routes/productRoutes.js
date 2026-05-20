const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');

// Configure image storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// GET: Fetch all products for the Shop and Admin Dashboard
router.get('/', (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// POST: Add a new product from the Admin Dashboard
router.post('/', upload.single('productimage'), (req, res) => {
    const { productname, productprice, categorynu } = req.body;
    const image = req.file ? req.file.filename : '';

    const sql = "INSERT INTO products (name, price, image, category) VALUES (?, ?, ?, ?)";
    db.query(sql, [productname, productprice, image, categorynu], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Product added successfully!" });
    });
});

// DELETE: Admin deletes a product
router.delete('/:id', (req, res) => {
    db.query("DELETE FROM products WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Product deleted" });
    });
});

module.exports = router;