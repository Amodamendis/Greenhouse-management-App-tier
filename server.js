const express = require('express');
const cors = require('cors');
const path = require('path');

require('./src/config/db');

const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Serve the uploads folder publicly so the frontend can display the images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => {
    res.json({ status: 'Backend Architecture is clean and running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`App Tier running on http://localhost:${PORT}`);
});