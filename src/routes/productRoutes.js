const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/upload');

// The 'upload.single' middleware intercepts the file named 'productimage' before hitting the controller
router.post('/', upload.single('productimage'), productController.addProduct);
router.get('/', productController.getAllProducts);
router.delete('/:id', productController.deleteProduct);

module.exports = router;