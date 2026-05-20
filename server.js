const contactRoutes = require('./src/routes/contactRoutes');
const express = require('express');
const cors = require('cors');
const path = require('path');

require('./src/config/db');

const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const checkoutRoutes = require('./src/routes/checkoutRoutes');
// 1. Import the new farm visits route
const farmVisitRoutes = require('./src/routes/farmVisitRoutes'); 

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => {
    res.json({ status: 'Backend Architecture is clean and running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
// 2. Mount the new route
app.use('/api/farmvisits', farmVisitRoutes); 
app.use('/api/contacts', contactRoutes);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`App Tier running on http://localhost:${PORT}`);
});
