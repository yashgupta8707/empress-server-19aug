// // models/Product.js
// import mongoose from 'mongoose';

// const productSchema = mongoose.Schema({
//   name: { 
//     type: String, 
//     required: [true, 'Product name is required'],
//     trim: true,
//     maxlength: [200, 'Product name cannot exceed 200 characters']
//   },
//   brand: { 
//     type: String, 
//     required: [true, 'Brand is required'],
//     trim: true,
//     maxlength: [50, 'Brand name cannot exceed 50 characters']
//   },
//   category: { 
//     type: String, 
//     required: [true, 'Category is required'],
//     trim: true,
//     lowercase: true,
//     enum: {
//       values: [
//         // PC Categories
//         'gaming-pc', 'workstation-pc', 'productivity-pc', 'budget-pc', 
//         'creative-pc', 'streaming-pc', 'office-pc', 'mini-pc',
        
//         // Component Categories
//         'processors', 'graphics-cards', 'motherboards', 'memory', 
//         'storage', 'power-supplies', 'cases', 'cooling',
        
//         // Peripheral Categories
//         'monitors', 'keyboards', 'mice', 'headsets', 'speakers', 
//         'webcams', 'mouse-pads',
        
//         // Laptop Categories
//         'gaming-laptops', 'business-laptops', 'ultrabooks', 'budget-laptops'
//       ],
//       message: 'Invalid category'
//     }
//   },
//   subCategory: {
//     type: String,
//     trim: true,
//     lowercase: true
//   },
//   price: { 
//     type: Number, 
//     required: [true, 'Price is required'],
//     min: [0, 'Price cannot be negative']
//   },
//   originalPrice: { 
//     type: Number,
//     min: [0, 'Original price cannot be negative'],
//     // validate: {
//     //   validator: function(value) {
//     //     return !value || value >= this.price;
//     //   },
//     //   message: 'Original price should be greater than or equal to current price'
//     // }
//   },
//   description1: { 
//     type: String,
//     trim: true,
//     maxlength: [1000, 'Description 1 cannot exceed 1000 characters']
//   },
//   description2: { 
//     type: String,
//     trim: true,
//     maxlength: [1000, 'Description 2 cannot exceed 1000 characters']
//   },
//   images: [{
//     type: String,
//     required: [true, 'At least one image is required']
//   }],
//   specs: {
//     type: Map,
//     of: String,
//     default: {}
//   },
//   badge: {
//     text: { 
//       type: String, 
//       default: 'New',
//       maxlength: [20, 'Badge text cannot exceed 20 characters']
//     },
//     color: { 
//       type: String, 
//       default: 'bg-blue-500',
//       enum: {
//         values: [
//           'bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500', 
//           'bg-purple-500', 'bg-indigo-500', 'bg-pink-500', 'bg-orange-500',
//           'bg-cyan-500', 'bg-gray-500'
//         ],
//         message: 'Invalid badge color'
//       }
//     }
//   },
//   quantity: { 
//     type: Number, 
//     default: 0,
//     min: [0, 'Quantity cannot be negative']
//   },
//   colors: [{
//     type: String,
//     trim: true
//   }],
//   sizes: [{
//     type: String,
//     trim: true
//   }],
//   rating: { 
//     type: Number, 
//     default: 0,
//     min: [0, 'Rating cannot be less than 0'],
//     max: [5, 'Rating cannot be more than 5']
//   },
//   reviews: { 
//     type: Number, 
//     default: 0,
//     min: [0, 'Review count cannot be negative']
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   isFeatured: {
//     type: Boolean,
//     default: false
//   },
//   tags: [{
//     type: String,
//     trim: true,
//     lowercase: true
//   }],
//   sku: {
//     type: String,
//     unique: true,
//     sparse: true
//   },
//   weight: {
//     type: Number,
//     min: [0, 'Weight cannot be negative']
//   },
//   dimensions: {
//     length: Number,
//     width: Number,
//     height: Number
//   },
//   // Enhanced fields for better categorization and filtering
//   performance: {
//     type: String,
//     enum: ['Beast', 'High', 'Regular', 'Basic'],
//     default: 'Regular'
//   },
//   useCase: [{
//     type: String,
//     enum: [
//       'Gaming', 'Video Editing', '3D Rendering', 'Development', 
//       'Design', 'Office Work', 'Content Creation', 'Streaming',
//       'Programming', 'Data Analysis', 'CAD', 'Animation'
//     ]
//   }],
//   compatibility: [{
//     type: String,
//     trim: true
//   }],
//   warrantyPeriod: {
//     type: Number, // in months
//     default: 12,
//     min: [0, 'Warranty period cannot be negative']
//   },
//   // Pricing history for analytics
//   priceHistory: [{
//     price: Number,
//     date: {
//       type: Date,
//       default: Date.now
//     }
//   }],
//   // Stock management
//   minStockLevel: {
//     type: Number,
//     default: 5,
//     min: [0, 'Minimum stock level cannot be negative']
//   },
//   maxStockLevel: {
//     type: Number,
//     default: 100,
//     min: [0, 'Maximum stock level cannot be negative']
//   },
//   // SEO fields
//   metaTitle: {
//     type: String,
//     maxlength: [60, 'Meta title cannot exceed 60 characters']
//   },
//   metaDescription: {
//     type: String,
//     maxlength: [160, 'Meta description cannot exceed 160 characters']
//   },
//   slug: {
//     type: String,
//     unique: true,
//     sparse: true,
//     lowercase: true,
//     trim: true
//   },
//   // Additional product information
//   manufacturer: {
//     type: String,
//     trim: true
//   },
//   model: {
//     type: String,
//     trim: true
//   },
//   releaseDate: {
//     type: Date
//   },
//   // Analytics fields
//   views: {
//     type: Number,
//     default: 0
//   },
//   clicks: {
//     type: Number,
//     default: 0
//   },
//   addToCartCount: {
//     type: Number,
//     default: 0
//   },
//   purchaseCount: {
//     type: Number,
//     default: 0
//   }
// }, {
//   timestamps: true
// });

// // Indexes for better performance
// productSchema.index({ category: 1, isActive: 1 });
// productSchema.index({ subCategory: 1, isActive: 1 });
// productSchema.index({ brand: 1, isActive: 1 });
// productSchema.index({ price: 1 });
// productSchema.index({ rating: -1 });
// productSchema.index({ isFeatured: 1, isActive: 1 });
// productSchema.index({ performance: 1, category: 1 });
// productSchema.index({ useCase: 1, isActive: 1 });
// productSchema.index({ tags: 1 });
// productSchema.index({ createdAt: -1 });
// productSchema.index({ slug: 1 });
// productSchema.index({ name: 'text', description1: 'text', description2: 'text', brand: 'text' });

// // Virtual for discount percentage
// productSchema.virtual('discountPercentage').get(function() {
//   if (this.originalPrice && this.originalPrice > this.price) {
//     return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
//   }
//   return 0;
// });

// // Virtual for stock status
// productSchema.virtual('stockStatus').get(function() {
//   if (this.quantity === 0) return 'out-of-stock';
//   if (this.quantity <= this.minStockLevel) return 'low-stock';
//   return 'in-stock';
// });

// // Virtual for availability
// productSchema.virtual('isAvailable').get(function() {
//   return this.isActive && this.quantity > 0;
// });

// // Virtual for savings amount
// productSchema.virtual('savingsAmount').get(function() {
//   if (this.originalPrice && this.originalPrice > this.price) {
//     return this.originalPrice - this.price;
//   }
//   return 0;
// });

// // Pre-save middleware
// productSchema.pre('save', function(next) {
//   // Generate SKU if not provided
//   if (!this.sku) {
//     const categoryCode = this.category.substring(0, 3).toUpperCase();
//     const brandCode = this.brand.substring(0, 3).toUpperCase();
//     const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
//     this.sku = `${categoryCode}-${brandCode}-${randomNum}`;
//   }
  
//   // Generate slug if not provided
//   if (!this.slug) {
//     this.slug = this.name
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/(^-|-$)/g, '');
//   }
  
//   // Ensure meta fields are set
//   if (!this.metaTitle) {
//     this.metaTitle = this.name.substring(0, 60);
//   }
  
//   if (!this.metaDescription) {
//     this.metaDescription = (this.description1 || this.description2 || '').substring(0, 160);
//   }
  
//   // Clean up empty strings from arrays
//   if (this.images) {
//     this.images = this.images.filter(img => img && img.trim() !== '');
//   }
//   if (this.colors) {
//     this.colors = this.colors.filter(color => color && color.trim() !== '');
//   }
//   if (this.sizes) {
//     this.sizes = this.sizes.filter(size => size && size.trim() !== '');
//   }
//   if (this.tags) {
//     this.tags = this.tags.filter(tag => tag && tag.trim() !== '');
//   }
//   if (this.useCase) {
//     this.useCase = this.useCase.filter(use => use && use.trim() !== '');
//   }
//   if (this.compatibility) {
//     this.compatibility = this.compatibility.filter(comp => comp && comp.trim() !== '');
//   }
  
//   // Update price history
//   if (this.isModified('price')) {
//     this.priceHistory.push({
//       price: this.price,
//       date: new Date()
//     });
    
//     // Keep only last 50 price changes
//     if (this.priceHistory.length > 50) {
//       this.priceHistory = this.priceHistory.slice(-50);
//     }
//   }
  
//   next();
// });

// // Static methods
// productSchema.statics.findByCategory = function(category) {
//   return this.find({ category, isActive: true });
// };

// productSchema.statics.findFeatured = function(limit = 10) {
//   return this.find({ isFeatured: true, isActive: true }).limit(limit);
// };

// productSchema.statics.findByPriceRange = function(minPrice, maxPrice) {
//   return this.find({ 
//     price: { $gte: minPrice, $lte: maxPrice }, 
//     isActive: true 
//   });
// };

// productSchema.statics.findLowStock = function() {
//   return this.find({
//     $expr: { $lte: ['$quantity', '$minStockLevel'] },
//     isActive: true
//   });
// };

// // Instance methods
// productSchema.methods.incrementView = function() {
//   this.views += 1;
//   return this.save();
// };

// productSchema.methods.incrementClick = function() {
//   this.clicks += 1;
//   return this.save();
// };

// productSchema.methods.incrementAddToCart = function() {
//   this.addToCartCount += 1;
//   return this.save();
// };

// productSchema.methods.incrementPurchase = function() {
//   this.purchaseCount += 1;
//   return this.save();
// };

// // Ensure virtuals are included in JSON
// productSchema.set('toJSON', { virtuals: true });
// productSchema.set('toObject', { virtuals: true });

// const Product = mongoose.model('Product', productSchema);
// export default Product;

// models/Product.js - Enhanced version with structured specifications
import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  brand: { 
    type: String, 
    required: [true, 'Brand is required'],
    trim: true,
    maxlength: [50, 'Brand name cannot exceed 50 characters']
  },
  category: { 
    type: String, 
    required: [true, 'Category is required'],
    trim: true,
    lowercase: true,
    enum: {
      values: [
        // PC Categories
        'gaming-pc', 'workstation-pc', 'productivity-pc', 'budget-pc', 
        'creative-pc', 'streaming-pc', 'office-pc', 'mini-pc',
        
        // Component Categories
        'processors', 'graphics-cards', 'motherboards', 'memory', 
        'storage', 'power-supplies', 'cases', 'cooling',
        
        // Peripheral Categories
        'monitors', 'keyboards', 'mice', 'headsets', 'speakers', 
        'webcams', 'mouse-pads',
        
        // Laptop Categories
        'gaming-laptops', 'business-laptops', 'ultrabooks', 'budget-laptops'
      ],
      message: 'Invalid category'
    }
  },
  subCategory: {
    type: String,
    trim: true,
    lowercase: true
  },
  price: { 
    type: Number, 
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: { 
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  
  // OPTION 1: Keep paragraph descriptions for general overview
  description1: { 
    type: String,
    trim: true,
    maxlength: [1000, 'Description 1 cannot exceed 1000 characters']
  },
  description2: { 
    type: String,
    trim: true,
    maxlength: [1000, 'Description 2 cannot exceed 1000 characters']
  },
  
  // OPTION 2: Replace with structured specification lists
  specifications: [{
    category: {
      type: String,
      required: true,
      trim: true,
      // Examples: "Performance", "Display", "Connectivity", "Physical", etc.
    },
    items: [{
      label: {
        type: String,
        required: true,
        trim: true,
        // Examples: "Processor", "RAM", "Storage", "Graphics Card"
      },
      value: {
        type: String,
        required: true,
        trim: true,
        // Examples: "Intel i7-12700K", "32GB DDR4", "1TB NVMe SSD"
      },
      unit: {
        type: String,
        trim: true,
        // Examples: "GB", "MHz", "inches", "W" - optional for measurements
      }
    }]
  }],
  
  // OPTION 3: Alternative - Flat specification list
  specificationsList: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    value: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      trim: true,
      default: 'General'
    },
    order: {
      type: Number,
      default: 0
    }
  }],
  
  // OPTION 4: Key features as bullet points
  keyFeatures: [{
    type: String,
    trim: true,
    maxlength: [200, 'Feature description cannot exceed 200 characters']
  }],
  
  // OPTION 5: Detailed technical specs by category
  technicalSpecs: {
    performance: [{
      metric: String,
      value: String,
      unit: String
    }],
    connectivity: [{
      type: String,
      details: String,
      quantity: Number
    }],
    physical: [{
      dimension: String,
      value: String,
      unit: String
    }],
    power: [{
      parameter: String,
      value: String,
      unit: String
    }],
    software: [{
      name: String,
      version: String,
      included: {
        type: Boolean,
        default: false
      }
    }]
  },

  images: [{
    type: String,
    required: [true, 'At least one image is required']
  }],
  
  // Keep the existing specs Map for backward compatibility
  specs: {
    type: Map,
    of: String,
    default: {}
  },
  
  badge: {
    text: { 
      type: String, 
      default: 'New',
      maxlength: [20, 'Badge text cannot exceed 20 characters']
    },
    color: { 
      type: String, 
      default: 'bg-blue-500',
      enum: {
        values: [
          'bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500', 
          'bg-purple-500', 'bg-indigo-500', 'bg-pink-500', 'bg-orange-500',
          'bg-cyan-500', 'bg-gray-500'
        ],
        message: 'Invalid badge color'
      }
    }
  },
  quantity: { 
    type: Number, 
    default: 0,
    min: [0, 'Quantity cannot be negative']
  },
  colors: [{
    type: String,
    trim: true
  }],
  sizes: [{
    type: String,
    trim: true
  }],
  rating: { 
    type: Number, 
    default: 0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  reviews: { 
    type: Number, 
    default: 0,
    min: [0, 'Review count cannot be negative']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  sku: {
    type: String,
    unique: true,
    sparse: true
  },
  weight: {
    type: Number,
    min: [0, 'Weight cannot be negative']
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  performance: {
    type: String,
    enum: ['Beast', 'High', 'Regular', 'Basic'],
    default: 'Regular'
  },
  useCase: [{
    type: String,
    enum: [
      'Gaming', 'Video Editing', '3D Rendering', 'Development', 
      'Design', 'Office Work', 'Content Creation', 'Streaming',
      'Programming', 'Data Analysis', 'CAD', 'Animation'
    ]
  }],
  compatibility: [{
    type: String,
    trim: true
  }],
  warrantyPeriod: {
    type: Number,
    default: 12,
    min: [0, 'Warranty period cannot be negative']
  },
  priceHistory: [{
    price: Number,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  minStockLevel: {
    type: Number,
    default: 5,
    min: [0, 'Minimum stock level cannot be negative']
  },
  maxStockLevel: {
    type: Number,
    default: 100,
    min: [0, 'Maximum stock level cannot be negative']
  },
  metaTitle: {
    type: String,
    maxlength: [60, 'Meta title cannot exceed 60 characters']
  },
  metaDescription: {
    type: String,
    maxlength: [160, 'Meta description cannot exceed 160 characters']
  },
  slug: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true
  },
  manufacturer: {
    type: String,
    trim: true
  },
  model: {
    type: String,
    trim: true
  },
  releaseDate: {
    type: Date
  },
  views: {
    type: Number,
    default: 0
  },
  clicks: {
    type: Number,
    default: 0
  },
  addToCartCount: {
    type: Number,
    default: 0
  },
  purchaseCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Enhanced indexes for specification searches
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ subCategory: 1, isActive: 1 });
productSchema.index({ brand: 1, isActive: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ isFeatured: 1, isActive: 1 });
productSchema.index({ performance: 1, category: 1 });
productSchema.index({ useCase: 1, isActive: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ slug: 1 });
productSchema.index({ 'specifications.category': 1 });
productSchema.index({ 'specifications.items.label': 1 });
productSchema.index({ 'specificationsList.name': 1 });
productSchema.index({ name: 'text', description1: 'text', description2: 'text', brand: 'text', 'keyFeatures': 'text' });

// Virtuals
productSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

productSchema.virtual('stockStatus').get(function() {
  if (this.quantity === 0) return 'out-of-stock';
  if (this.quantity <= this.minStockLevel) return 'low-stock';
  return 'in-stock';
});

productSchema.virtual('isAvailable').get(function() {
  return this.isActive && this.quantity > 0;
});

productSchema.virtual('savingsAmount').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return this.originalPrice - this.price;
  }
  return 0;
});

// Pre-save middleware with enhanced specification handling
productSchema.pre('save', function(next) {
  // Generate SKU if not provided
  if (!this.sku) {
    const categoryCode = this.category.substring(0, 3).toUpperCase();
    const brandCode = this.brand.substring(0, 3).toUpperCase();
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.sku = `${categoryCode}-${brandCode}-${randomNum}`;
  }
  
  // Generate slug if not provided
  if (!this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  
  // Ensure meta fields are set
  if (!this.metaTitle) {
    this.metaTitle = this.name.substring(0, 60);
  }
  
  if (!this.metaDescription) {
    // Try to generate from key features first, then descriptions
    let metaDesc = '';
    if (this.keyFeatures && this.keyFeatures.length > 0) {
      metaDesc = this.keyFeatures.slice(0, 2).join('. ');
    } else {
      metaDesc = this.description1 || this.description2 || '';
    }
    this.metaDescription = metaDesc.substring(0, 160);
  }
  
  // Clean up arrays
  if (this.images) {
    this.images = this.images.filter(img => img && img.trim() !== '');
  }
  if (this.colors) {
    this.colors = this.colors.filter(color => color && color.trim() !== '');
  }
  if (this.sizes) {
    this.sizes = this.sizes.filter(size => size && size.trim() !== '');
  }
  if (this.tags) {
    this.tags = this.tags.filter(tag => tag && tag.trim() !== '');
  }
  if (this.useCase) {
    this.useCase = this.useCase.filter(use => use && use.trim() !== '');
  }
  if (this.compatibility) {
    this.compatibility = this.compatibility.filter(comp => comp && comp.trim() !== '');
  }
  if (this.keyFeatures) {
    this.keyFeatures = this.keyFeatures.filter(feature => feature && feature.trim() !== '');
  }
  
  // Clean up specifications
  if (this.specifications) {
    this.specifications = this.specifications.filter(spec => 
      spec.category && spec.category.trim() !== '' && 
      spec.items && spec.items.length > 0
    );
    
    this.specifications.forEach(spec => {
      spec.items = spec.items.filter(item => 
        item.label && item.label.trim() !== '' && 
        item.value && item.value.trim() !== ''
      );
    });
  }
  
  if (this.specificationsList) {
    this.specificationsList = this.specificationsList.filter(spec => 
      spec.name && spec.name.trim() !== '' && 
      spec.value && spec.value.trim() !== ''
    );
    
    // Sort by order field
    this.specificationsList.sort((a, b) => a.order - b.order);
  }
  
  // Update price history
  if (this.isModified('price')) {
    this.priceHistory.push({
      price: this.price,
      date: new Date()
    });
    
    if (this.priceHistory.length > 50) {
      this.priceHistory = this.priceHistory.slice(-50);
    }
  }
  
  next();
});

// Enhanced static methods
productSchema.statics.findByCategory = function(category) {
  return this.find({ category, isActive: true });
};

productSchema.statics.findFeatured = function(limit = 10) {
  return this.find({ isFeatured: true, isActive: true }).limit(limit);
};

productSchema.statics.findByPriceRange = function(minPrice, maxPrice) {
  return this.find({ 
    price: { $gte: minPrice, $lte: maxPrice }, 
    isActive: true 
  });
};

productSchema.statics.findLowStock = function() {
  return this.find({
    $expr: { $lte: ['$quantity', '$minStockLevel'] },
    isActive: true
  });
};

// New method to find products by specification
productSchema.statics.findBySpecification = function(specName, specValue) {
  return this.find({
    $or: [
      { 'specifications.items.label': new RegExp(specName, 'i') },
      { 'specificationsList.name': new RegExp(specName, 'i') }
    ],
    isActive: true
  });
};

// Instance methods
productSchema.methods.incrementView = function() {
  this.views += 1;
  return this.save();
};

productSchema.methods.incrementClick = function() {
  this.clicks += 1;
  return this.save();
};

productSchema.methods.incrementAddToCart = function() {
  this.addToCartCount += 1;
  return this.save();
};

productSchema.methods.incrementPurchase = function() {
  this.purchaseCount += 1;
  return this.save();
};

// New method to get specifications in a formatted way
productSchema.methods.getFormattedSpecifications = function() {
  const formatted = {};
  
  if (this.specifications && this.specifications.length > 0) {
    this.specifications.forEach(spec => {
      formatted[spec.category] = spec.items.map(item => ({
        label: item.label,
        value: item.unit ? `${item.value} ${item.unit}` : item.value
      }));
    });
  }
  
  return formatted;
};

// Ensure virtuals are included in JSON
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.model('Product', productSchema);
export default Product;