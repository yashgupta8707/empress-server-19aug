import express from 'express';
import { 
  createProduct, 
  editProduct, 
  deleteProduct, 
  getAllProducts, 
  createBlog, 
  editBlog, 
  deleteBlog, 
  getAllBlogs, 
  getAllOrders, 
  getUserOrderHistory, 
  getAllUsers, 
  getOrderById,
  updateOrderStatus,
  markOrderAsPaid,
  markOrderAsDelivered,
  getOrderStats
} from '../controllers/adminController.js';
import { 
  getAllContacts, 
  getContactById, 
  updateContact, 
  deleteContact, 
  getContactStats 
} from '../controllers/contactController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Product routes
router.post('/create-product', protect, admin, createProduct);
router.put('/edit-product/:id', protect, admin, editProduct);
router.delete('/delete-product/:id', protect, admin, deleteProduct);

// User routes
router.get('/get-all-users', protect, admin, getAllUsers);
router.get('/get-user-history/:id', protect, admin, getUserOrderHistory);

// Blog routes
router.post('/create-blog', protect, admin, createBlog);
router.put('/edit-blog/:id', protect, admin, editBlog);
router.delete('/delete-blog/:id', protect, admin, deleteBlog);

// Order routes
router.get('/get-all-orders', protect, admin, getAllOrders);
router.get('/get-order/:id', protect, admin, getOrderById);
router.put('/orders/:id/status', protect, admin, updateOrderStatus);
router.put('/orders/:id/paid', protect, admin, markOrderAsPaid);
router.put('/orders/:id/delivered', protect, admin, markOrderAsDelivered);
router.get('/order-stats', protect, admin, getOrderStats);

// Contact routes (Admin)
router.get('/contacts', protect, admin, getAllContacts);
router.get('/contacts/stats', protect, admin, getContactStats);
router.get('/contacts/:id', protect, admin, getContactById);
router.put('/contacts/:id', protect, admin, updateContact);
router.delete('/contacts/:id', protect, admin, deleteContact);

// Common API routes
router.get('/get-all-products', protect, getAllProducts);
router.get('/get-all-blogs', protect, getAllBlogs);

export default router;