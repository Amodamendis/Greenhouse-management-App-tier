const express = require('express');
const cors = require('cors');

// Import database connection
require('./src/config/db');

// Import Route Files
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Base Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Backend Architecture is clean and running!' });
});

// Mount Routes
app.use('/api/auth', authRoutes);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`App Tier running on http://localhost:${PORT}`);
});