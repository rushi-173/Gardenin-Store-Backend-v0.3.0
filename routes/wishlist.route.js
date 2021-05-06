const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");
const verify = require("./verifyToken");

//Get user's wishlist
router.get("/", verify, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user_id: req.user._id });
    res.json(wishlist);
  } catch (err) {
    res.json({ message: err });
  }
});

//add new user's wishlist or update previous wishlist
router.post("/", verify, async (req, res) => {
  const hasWishlist = await Wishlist.find({ user_id: req.user._id});
  if(hasWishlist.length !== 0){
    try {
      const savedWishlist = await Wishlist.findOneAndUpdate(
        { user_id: req.user._id },
        { wishlist: req.body.wishlist },
        {new: true},
        async function (err, result) {
          if(err){
          res.status(400).json({ message: err });}
        }
      );
      res.status(200).json(savedWishlist);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
  else{
   
      const wishlist = new Wishlist({
        user: req.user._id,
        wishlist: req.body.wishlist,
      });
      try {
        const savedWishlist = await wishlist.save();
        res.json(savedWishlist);
      } catch (err) {
        res.status(400).json({ message: err });
      }
  }
 
});

module.exports = router;
