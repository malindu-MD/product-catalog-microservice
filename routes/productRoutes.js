/**
 * Product Routes.
 * Handles routing for product-related requests.
 */

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define the routes for product CRUD operations

// GET /products - Retrieve a list of products with optional filters and pagination
router.get('/products', productController.getProducts);

// GET /products/:id - Retrieve a single product by ID
router.get('/products/:id', productController.getProductById);

// POST /products - Create a new product (admin only)
router.post('/products', productController.createProduct);

// PUT /products/:id - Update an existing product (admin only)
router.put('/products/:id', productController.updateProduct);

// DELETE /products/:id - Delete a product (admin only)
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
