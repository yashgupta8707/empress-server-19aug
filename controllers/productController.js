// controllers/productController.js - UPDATED
import Product from '../models/Product.js';

// ========== PUBLIC ROUTES ==========

// Get all products with advanced filtering and pagination
export const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      brand,
      search,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 12,
      featured
    } = req.query;

    // Build filter object
    const filter = { isActive: true }; // Only show active products
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (brand && brand !== 'all') {
      filter.brand = { $regex: brand, $options: 'i' };
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { description1: { $regex: search, $options: 'i' } },
        { description2: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    
    if (featured === 'true') {
      filter.isFeatured = true;
    }

    // Build sort object
    const sortOrder = order === 'desc' ? -1 : 1;
    let sortOption = {};
    
    switch (sortBy) {
      case 'price':
        sortOption = { price: sortOrder };
        break;
      case 'name':
        sortOption = { name: sortOrder };
        break;
      case 'rating':
        sortOption = { rating: sortOrder };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { [sortBy]: sortOrder };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get products with pagination
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit));

    // Get categories and brands for filters
    const categories = await Product.distinct('category', { isActive: true });
    const brands = await Product.distinct('brand', { isActive: true });

    res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          total,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        },
        filters: {
          categories,
          brands
        }
      }
    });
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const {
      brand,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 12
    } = req.query;

    const filter = { category: categoryId, isActive: true };
    
    if (brand && brand !== 'all') {
      filter.brand = { $regex: brand, $options: 'i' };
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    const sortOrder = order === 'desc' ? -1 : 1;
    const sortOption = { [sortBy]: sortOrder };
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit));

    // Get available brands for this category
    const brands = await Product.distinct('brand', { category: categoryId, isActive: true });

    res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          total,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        },
        category: categoryId,
        availableBrands: brands
      }
    });
  } catch (error) {
    console.error('Error in getProductsByCategory:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findOne({ _id: id, isActive: true });
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Get related products (same category, excluding current product)
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: id },
      isActive: true
    }).limit(6);

    res.status(200).json({
      success: true,
      data: {
        product,
        relatedProducts
      }
    });
  } catch (error) {
    console.error('Error in getProductById:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get featured products
export const getFeaturedProducts = async (req, res) => {
  try {
    const { limit = 8 } = req.query;
    
    const products = await Product.find({
      isActive: true,
      $or: [
        { isFeatured: true },
        { 'badge.text': { $in: ['Featured', 'Hot', 'Popular'] } },
        { rating: { $gte: 4.0 } }
      ]
    })
      .sort({ rating: -1, createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Error in getFeaturedProducts:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get categories with counts
export const getCategories = async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error('Error in getCategories:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ========== ADMIN ROUTES ==========

// Get all products for admin
export const getAllProductsAdmin = async (req, res) => {
  try {
    const {
      category,
      brand,
      search,
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;

    const filter = {};
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (brand && brand !== 'all') {
      filter.brand = { $regex: brand, $options: 'i' };
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOrder = order === 'desc' ? -1 : 1;
    const sortOption = { [sortBy]: sortOrder };
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          total,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Error in getAllProductsAdmin:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new product
export const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    
    // Validate required fields
    if (!productData.name || !productData.brand || !productData.category || !productData.price) {
      return res.status(400).json({
        success: false,
        message: 'Name, brand, category, and price are required'
      });
    }

    const product = new Product(productData);
    const savedProduct = await product.save();
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: savedProduct
    });
  } catch (error) {
    console.error('Error in createProduct:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    console.error('Error in updateProduct:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get product statistics
export const getProductStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ isActive: true });
    const inStockProducts = await Product.countDocuments({ quantity: { $gt: 0 }, isActive: true });
    const outOfStockProducts = await Product.countDocuments({ quantity: { $lte: 0 }, isActive: true });
    
    const categoryStats = await Product.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const brandStats = await Product.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$brand', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const priceStats = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          totalValue: { $sum: { $multiply: ['$price', '$quantity'] } }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        activeProducts,
        inStockProducts,
        outOfStockProducts,
        categoryStats,
        brandStats,
        priceStats: priceStats[0] || {}
      }
    });
  } catch (error) {
    console.error('Error in getProductStats:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};