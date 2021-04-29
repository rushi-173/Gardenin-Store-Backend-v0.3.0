const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: String,
  imageUrl: String,
  description: String,
  mrp: Number,
  price: Number,
  storeName: String,
  link: String,
  inStock: Boolean,
  fastDelivery: Boolean,
  rating: {
    type: Number,
    default: 0
  },
  categories: [],
  numberOfRatings: {
    type: Number,
    default: 0
  },
  date: {
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);
