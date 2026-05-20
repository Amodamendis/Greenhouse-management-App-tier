const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

router.post('/', checkoutController.processCheckout);

module.exports = router;

// GET: Admin views all orders
router.get('/', (req, res) => {
    db.query("SELECT * FROM checkout_details ORDER BY created_at DESC", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// DELETE: Admin clears orders
router.delete('/clear', (req, res) => {
    db.query("TRUNCATE TABLE checkout_details", (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Orders cleared" });
    });
});