// const {} = require('./validation');
const mongoose = require("mongoose");
const Product = mongoose.model('Product');

// Function to get products from the database
exports.getProduct = async () => {
  return Product.find();
};

// Function to add product to the database
exports.addProduct = (req) => {
  let payload = {
    name: req.body.productName,
    price: req.body.productPrice
  }

  const product = new Product(payload);

  return product.save();
};

// Function to update product in the database
exports.updateProduct = (req) => {
  let payload = {
    name: req.body.productName,
    price: req.body.productPrice
  }

  return Product.findOneAndUpdate({
    '_id': req.body.productId
  }, payload);
};

// Function to delete product in the database
exports.deleteProduct = (req) => {
  return Product.findOneAndDelete({
    '_id': req.body.productId
  });
};