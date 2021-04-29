const mongoose = require("mongoose");

const WishlistSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  wishlist: [],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Wishlist", WishlistSchema);
