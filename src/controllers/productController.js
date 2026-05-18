const db = require('../config/db');

// Add a new product 
exports.addProduct = (req, res) => {
    const { productname, productprice, categorynu } = req.body;
    
    // Multer places the file info in req.file
    if (!req.file) {
        return res.status(400).json({ error: 'No image provided' });
    }
    const imageFilename = req.file.filename;

    const query = 'INSERT INTO products (name, price, image, category) VALUES (?, ?, ?, ?)';
    db.query(query, [productname, productprice, imageFilename, categorynu], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to add product to database' });
        res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
    });
};

// Get all products 
exports.getAllProducts = (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch products' });
        res.json(results);
    });
};

// Delete a product 
exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    
    db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to delete product' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    });
};