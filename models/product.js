/**
 * Product Model for MongoDB using Mongoose.
 * Represents the structure of a product document in the database.
 */

const mongoose = require('mongoose');

// Define the schema for a product
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be a positive value']
  },
  category: {
    type: String,
    required: [true, 'Product category is required']
  },
  availability: {
    type: String,
    enum: ['in_stock', 'out_of_stock', 'pre_order'],
    default: 'in_stock'
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  images: [String], // Array of image URLs for the product
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

/**
 * Mongoose model for the Product.
 * Exporting the model for use in controllers.
 */
module.exports = mongoose.model('Product', productSchema);
