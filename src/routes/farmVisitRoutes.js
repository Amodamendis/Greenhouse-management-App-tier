const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

// POST: Save a new farm visit
router.post('/', (req, res) => {
    const { full_name, email, num_visitors, visit_date, time_slot, special_requirements } = req.body;
    const sql = `INSERT INTO farm_visits (full_name, email, num_visitors, visit_date, time_slot, special_requirements) VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.query(sql, [full_name, email, num_visitors, visit_date, time_slot, special_requirements], (err, result) => {
        if(err) return res.status(500).json({error: err.message});
        res.status(201).json({message: "Visit booked successfully"});
    });
});

// GET: Admin view all farm visits
router.get('/', (req, res) => {
    db.query("SELECT * FROM farm_visits ORDER BY booking_date DESC", (err, results) => {
        if(err) return res.status(500).json({error: err.message});
        res.json(results);
    });
});

// DELETE: Admin clear all records
router.delete('/clear', (req, res) => {
    db.query("DELETE FROM farm_visits", (err, result) => {
        if(err) return res.status(500).json({error: err.message});
        res.json({message: "All records cleared"});
    });
});

module.exports = router;