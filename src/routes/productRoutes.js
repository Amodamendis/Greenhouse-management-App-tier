const express = require('express');
const router = express.Router();

// Import the hybrid S3/Local middleware and the controller we built!
const upload = require('../middlewares/upload');
const productController = require('../controllers/productController');

// GET: Fetch all products
router.get('/', productController.getAllProducts);

// POST: Add a new product (Intercepted by our S3 Hybrid Middleware!)
// Notice it expects 'productimage' which perfectly matches your React FormData
router.post('/', upload.single('productimage'), productController.addProduct);

// DELETE: Admin deletes a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;