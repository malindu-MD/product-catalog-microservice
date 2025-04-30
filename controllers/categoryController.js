const Product = require('../models/product');

exports.getCategories = async (req, res) => {
  const categories = await Product.distinct('category');
  res.json({ categories });
};
