/**
 * Product Controller.
 * Handles the business logic for CRUD operations on the product catalog.
 */

const Product = require('../models/product');

/**
 * Get all products with optional filters and pagination.
 * Filters: category, price_min, price_max, search, page, limit
 */
exports.getProducts = async (req, res, next) => {
  try {
    const { category, price_min, price_max, search, page = 1, limit = 10 } = req.query;

    // Construct filter based on query parameters
    const filter = {};
    if (category) filter.category = category;
    if (price_min || price_max) {
      filter.price = {};
      if (price_min) filter.price.$gte = parseFloat(price_min);
      if (price_max) filter.price.$lte = parseFloat(price_max);
    }
    if (search) {
      filter.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    // Pagination logic
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch filtered and paginated products from the database
    const products = await Product.find(filter).skip(skip).limit(parseInt(limit));

    // Get the total number of matching products for pagination
    const total = await Product.countDocuments(filter);

    res.status(200).json({
      page: parseInt(page),
      total_results: total,
      products,
    });
  } catch (error) {
    next(error); // Pass errors to the error handler middleware
  }
};

/**
 * Get a product by ID.
 */
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new product.
 * Admin only functionality.
 */
exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, category, description, images } = req.body;

    const newProduct = new Product({
      name,
      price,
      category,
      description,
      images,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product_id: newProduct._id });
  } catch (error) {
    next(error);
  }
};

/**
 * Update an existing product by ID.
 * Admin only functionality.
 */
exports.updateProduct = async (req, res, next) => {
  try {
    const { price, availability, description } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { price, availability, description },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a product by ID.
 * Admin only functionality.
 */
exports.deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
