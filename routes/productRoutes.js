// routes/productRoutes.js - UPDATED
import express from 'express';
import {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  getFeaturedProducts,
  getCategories,
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// ========== PUBLIC ROUTES ==========
// Health check for products
router.get('/health', (req, res) => {
  res.json({ success: true, message: 'Product routes working' });
});

// Get all products with filters
router.get('/', getAllProducts);

// Get featured products
router.get('/featured', getFeaturedProducts);

// Get categories
router.get('/categories', getCategories);

// Get products by category (must be before /:id route)
router.get('/category/:categoryId', getProductsByCategory);

// Multiple routes for product detail to handle different frontend calls
router.get('/public/:id', getProductById);
router.get('/details/:id', getProductById);

// Generic product by ID route (must be last among GET routes)
router.get('/:id', getProductById);

// ========== ADMIN ROUTES ==========
// Admin routes with protection
router.get('/admin/all', protect, admin, getAllProductsAdmin);
router.post('/admin/create', protect, admin, createProduct);
router.get('/admin/stats', protect, admin, getProductStats);
router.get('/admin/:id', protect, admin, getProductById);
router.put('/admin/:id', protect, admin, updateProduct);
router.delete('/admin/:id', protect, admin, deleteProduct);

export default router;