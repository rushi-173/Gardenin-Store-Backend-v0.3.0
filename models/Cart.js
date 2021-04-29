const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cart: [],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Cart = mongoose.model("Cart", CartSchema);
