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
    // Safely extract and validate query parameters
    const rawCategory = req.query.category;
    const rawPriceMin = req.query.price_min;
    const rawPriceMax = req.query.price_max;
    const rawSearch = req.query.search;
    const rawPage = parseInt(req.query.page, 10);
    const rawLimit = parseInt(req.query.limit, 10);

    const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
    const limit = Number.isInteger(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, 100) : 10;
    const skip = (page - 1) * limit;

    // Build filter object securely
    const filter = {};

    if (typeof rawCategory === 'string' && rawCategory.trim()) {
      filter.category = rawCategory.trim();
    }

    if (!isNaN(rawPriceMin) || !isNaN(rawPriceMax)) {
      filter.price = {};
      if (!isNaN(rawPriceMin)) filter.price.$gte = parseFloat(rawPriceMin);
      if (!isNaN(rawPriceMax)) filter.price.$lte = parseFloat(rawPriceMax);
    }

    if (typeof rawSearch === 'string' && rawSearch.trim()) {
      filter.name = { $regex: rawSearch.trim(), $options: 'i' };
    }

    // Fetch products securely
    const products = await Product.find(filter).skip(skip).limit(limit);
    const total = await Product.countDocuments(filter);

    res.status(200).json({
      page,
      total_results: total,
      products,
    });
  } catch (error) {
    next(error);
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
