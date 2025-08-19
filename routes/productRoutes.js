// // routes/productRoutes.js
// import express from 'express';
// import Product from '../models/Product.js';
// import { protect, admin } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // @desc Get all products with filtering and pagination
// // @route GET /api/products
// // @access Public
// router.get('/', async (req, res) => {
//   try {
//     const pageSize = 12;
//     const page = Number(req.query.pageNumber) || 1;
//     const keyword = req.query.keyword
//       ? { name: { $regex: req.query.keyword, $options: 'i' } }
//       : {};

//     const category = req.query.category ? { category: req.query.category } : {};
//     const brand = req.query.brand ? { brand: req.query.brand } : {};
    
//     // Price filter
//     let priceFilter = {};
//     if (req.query.minPrice || req.query.maxPrice) {
//       priceFilter.price = {};
//       if (req.query.minPrice) priceFilter.price.$gte = Number(req.query.minPrice);
//       if (req.query.maxPrice) priceFilter.price.$lte = Number(req.query.maxPrice);
//     }

//     const count = await Product.countDocuments({ ...keyword, ...category, ...brand, ...priceFilter });
    
//     let sortOption = {};
//     if (req.query.sortBy) {
//       switch (req.query.sortBy) {
//         case 'price-low':
//           sortOption = { price: 1 };
//           break;
//         case 'price-high':
//           sortOption = { price: -1 };
//           break;
//         case 'name':
//           sortOption = { name: 1 };
//           break;
//         default:
//           sortOption = { createdAt: -1 };
//       }
//     }

//     const products = await Product.find({ ...keyword, ...category, ...brand, ...priceFilter })
//       .sort(sortOption)
//       .limit(pageSize)
//       .skip(pageSize * (page - 1));

//     res.json({ products, page, pages: Math.ceil(count / pageSize) });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // @desc Get products by category
// // @route GET /api/products/category/:categoryId
// // @access Public
// router.get('/category/:categoryId', async (req, res) => {
//   try {
//     const { categoryId } = req.params;
//     const products = await Product.find({ category: categoryId });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // @desc Get single product
// // @route GET /api/products/:id
// // @access Public
// router.get('/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // @desc Create a product
// // @route POST /api/products
// // @access Private/Admin
// router.post('/', protect, admin, async (req, res) => {
//   try {
//     const product = new Product({
//       name: req.body.name,
//       brand: req.body.brand,
//       category: req.body.category,
//       price: req.body.price,
//       originalPrice: req.body.originalPrice,
//       description1: req.body.description1,
//       description2: req.body.description2,
//       images: req.body.images,
//       specs: req.body.specs,
//       badge: req.body.badge,
//       inStock: req.body.inStock,
//       colors: req.body.colors,
//       sizes: req.body.sizes
//     });

//     const createdProduct = await product.save();
//     res.status(201).json(createdProduct);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // @desc Update a product
// // @route PUT /api/products/:id
// // @access Private/Admin
// router.put('/:id', protect, admin, async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (product) {
//       Object.assign(product, req.body);
//       const updatedProduct = await product.save();
//       res.json(updatedProduct);
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // @desc Delete a product
// // @route DELETE /api/products/:id
// // @access Private/Admin
// router.delete('/:id', protect, admin, async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (product) {
//       await Product.findByIdAndDelete(req.params.id);
//       res.json({ message: 'Product removed' });
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // @desc Get categories with product counts
// // @route GET /api/products/categories/list
// // @access Public
// router.get('/categories/list', async (req, res) => {
//   try {
//     const categories = await Product.aggregate([
//       {
//         $group: {
//           _id: '$category',
//           count: { $sum: 1 },
//           avgPrice: { $avg: '$price' }
//         }
//       },
//       {
//         $sort: { _id: 1 }
//       }
//     ]);
    
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;

// routes/productRoutes.js
// import express from 'express';
// import {
//   getAllProducts,
//   getProductsByCategory,
//   getProductById,
//   getFeaturedProducts,
//   getCategories,
//   getAllProductsAdmin,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   getProductStats
// } from '../controllers/productController.js';
// import { protect, admin } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // ========== PUBLIC ROUTES ==========
// router.get('/', getAllProducts);
// router.get('/featured', getFeaturedProducts);
// router.get('/categories', getCategories);
// router.get('/category/:categoryId', getProductsByCategory);
// router.get('/public/:id', getProductById);

// // ========== ADMIN ROUTES ==========
// router.get('/admin/all', protect, admin, getAllProductsAdmin);
// router.post('/admin/create', protect, admin, createProduct);
// router.get('/admin/stats', protect, admin, getProductStats);
// router.get('/admin/:id', protect, admin, getProductById);
// router.put('/admin/:id', protect, admin, updateProduct);
// router.delete('/admin/:id', protect, admin, deleteProduct);

// export default router;


// Add these routes to your backend productRoutes.js

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
router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/categories', getCategories);
router.get('/category/:categoryId', getProductsByCategory);

// Multiple routes for product detail to handle different frontend calls
router.get('/public/:id', getProductById);
router.get('/details/:id', getProductById);
router.get('/:id', getProductById); // Fallback route

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ========== ADMIN ROUTES ==========
router.get('/admin/all', protect, admin, getAllProductsAdmin);
router.post('/admin/create', protect, admin, createProduct);
router.get('/admin/stats', protect, admin, getProductStats);
router.get('/admin/:id', protect, admin, getProductById);
router.put('/admin/:id', protect, admin, updateProduct);
router.delete('/admin/:id', protect, admin, deleteProduct);

export default router;