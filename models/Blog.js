// models/Blog.js
import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  slug: { 
    type: String, 
    unique: true 
  },
  summary: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true,
    enum: ['nvidia', 'tech', 'computing', 'mobile', 'gadget', 'technology', 'news', 'design', 'ai', 'article']
  },
  type: {
    type: String,
    enum: ['blog', 'article'],
    default: 'blog'
  },
  tags: [{ 
    type: String 
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  readTime: {
    type: String,
    default: '5 mins'
  },
  isPublished: { 
    type: Boolean, 
    default: true 
  },
  isFeatured: { 
    type: Boolean, 
    default: false 
  },
  isEditorsChoice: { 
    type: Boolean, 
    default: false 
  },
  views: { 
    type: Number, 
    default: 0 
  },
  likes: { 
    type: Number, 
    default: 0 
  },
  publishedAt: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true 
});

// Create slug from title before saving
blogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

// Add index for better performance
blogSchema.index({ slug: 1 });
blogSchema.index({ category: 1, isPublished: 1 });
blogSchema.index({ type: 1, isPublished: 1 });

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;