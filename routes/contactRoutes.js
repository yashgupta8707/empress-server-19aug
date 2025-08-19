// routes/contactRoutes.js
import express from 'express';
import { 
  submitContactForm,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  getContactStats
} from '../controllers/contactController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route - Submit contact form
router.post('/', submitContactForm);

// Admin routes - Manage contact inquiries
router.get('/admin/contacts', protect, admin, getAllContacts);
router.get('/admin/contacts/stats', protect, admin, getContactStats);
router.get('/admin/contacts/:id', protect, admin, getContactById);
router.put('/admin/contacts/:id', protect, admin, updateContact);
router.delete('/admin/contacts/:id', protect, admin, deleteContact);

export default router;