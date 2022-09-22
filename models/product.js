const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    trim: true,
  },
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);