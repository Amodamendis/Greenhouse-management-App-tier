const contactRoutes = require('./src/routes/contactRoutes');
const express = require('express');
const cors = require('cors');
const path = require('path');

require('./src/config/db');

const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const checkoutRoutes = require('./src/routes/checkoutRoutes');
const farmVisitRoutes = require('./src/routes/farmVisitRoutes'); 

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- NEW FIX: Satisfy the AWS ALB Default Health Check ---
app.get('/', (req, res) => {
    res.status(200).send('AWS Health Check OK');
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'Backend Architecture is clean and running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/farmvisits', farmVisitRoutes); 
app.use('/api/contacts', contactRoutes);

const PORT = 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`App Tier running on port ${PORT} and ready for Load Balancer traffic!`);
});