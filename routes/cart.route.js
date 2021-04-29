const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const verify = require("./verifyToken");

//Get user's cart
router.get("/", verify, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.body.user_id });
    res.json(cart);
  } catch (err) {
    res.json({ message: err });
  }
});

//add new user's cart or update previous cart
router.post("/", verify, async (req, res) => {
  const hasCart = await Cart.find({ user_id: req.body.user_id});
  if(hasCart.length !== 0){
    try {
      const savedCart = await Cart.findOneAndUpdate(
        { user_id: req.body.user_id },
        { cart: req.body.cart },
        {new: true},
        async function (err, result) {
          if(err){
          res.status(400).json({ message: err });}
        }
      );
      res.status(200).json(savedCart);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
  else{
   
      const cart = new Cart({
        user: req.body.user_id,
        cart: req.body.cart,
      });
      try {
        const savedCart = await cart.save();
        res.json(savedCart);
      } catch (err) {
        res.status(400).json({ message: err });
      }
  }
 
});

module.exports = router;
