const db = require('../config/db');

// Process Checkout (Translates: checkout.php)
exports.processCheckout = (req, res) => {
    const {
        username, name, email, address, city, state, zip,
        cardname, cardnumber, expmonth, expyear, cvv,
        products, total_price
    } = req.body;

    // 1. Save the order details
    const checkoutQuery = `INSERT INTO checkout_details 
        (name, email, address, city, state, zip, cardname, cardnumber, expmonth, expyear, cvv, products, total_price, username) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(checkoutQuery, [name, email, address, city, state, zip, cardname, cardnumber, expmonth, expyear, cvv, products, total_price, username], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to process checkout' });

        // 2. Update the user's journey table with the purchase amount
        db.query('UPDATE journey SET total_purchase = IFNULL(total_purchase, 0) + ? WHERE username = ? ORDER BY created_at DESC LIMIT 1', [total_price, username], (err) => {
            if (err) console.error('Failed to update journey log:', err);
        });

        // 3. Empty the user's cart now that they have bought the items
        db.query('DELETE FROM cart WHERE username = ?', [username], (err) => {
            if (err) console.error('Failed to clear cart:', err);
        });

        res.status(201).json({ message: 'Order placed successfully!' });
    });
};