const db = require('../config/db');

// Add item to cart (Translates: addtocart.php)
exports.addToCart = (req, res) => {
    const { username, name, price, image, quantity } = req.body;
    
    // Check if the item is already in this user's cart
    db.query('SELECT * FROM cart WHERE username = ? AND name = ?', [username, name], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        if (results.length > 0) {
            // Item exists, update the quantity
            const newQty = results[0].quantity + parseInt(quantity);
            db.query('UPDATE cart SET quantity = ? WHERE id = ?', [newQty, results[0].id], (err) => {
                if (err) return res.status(500).json({ error: 'Failed to update cart quantity' });
                return res.json({ message: 'Cart updated successfully' });
            });
        } else {
            // New item, insert into cart
            const query = 'INSERT INTO cart (username, name, price, image, quantity) VALUES (?, ?, ?, ?, ?)';
            db.query(query, [username, name, price, image, quantity], (err) => {
                if (err) return res.status(500).json({ error: 'Failed to add to cart' });
                return res.status(201).json({ message: 'Item added to cart' });
            });
        }
    });
};

// Get cart for a specific user
exports.getCart = (req, res) => {
    const { username } = req.params;
    db.query('SELECT * FROM cart WHERE username = ?', [username], (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch cart' });
        res.json(results);
    });
};

// Remove item from cart
exports.removeFromCart = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM cart WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to remove item' });
        res.json({ message: 'Item removed from cart' });
    });
};