const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  product ? res.json(product) : res.status(404).json({ message: 'Not found' });
};

exports.createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(201).json(newProduct);
};

exports.updateProduct = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  updatedProduct
    ? res.json(updatedProduct)
    : res.status(404).json({ message: 'Not found' });
};

exports.deleteProduct = async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  deleted
    ? res.json({ message: 'Product deleted' })
    : res.status(404).json({ message: 'Not found' });
};
