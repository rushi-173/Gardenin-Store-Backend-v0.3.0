const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const verify = require("./verifyToken");

//Get user's cart
router.get("/", verify, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.user._id });
    res.json(cart);
  } catch (err) {
    res.json({ message: err });
  }
});


//add new user's cart or update previous cart
router.post("/", verify, async (req, res) => {
    console.log("present", req.body.cart);

  const hasCart = await Cart.find({ user_id: req.user._id});
  console.log(req.body.cart);
  if(hasCart.length !== 0){
    console.log("present", req.body.cart);
    let temp = hasCart[0];
    try {
      
    console.log("present", req.body.cart);
      const savedCart = await Cart.findOneAndUpdate(
        { user_id: req.user._id },
        { 
          // cart: addToCart(req.body.product, temp.cart ) 
          cart: req.body.cart
        },
        {new: true},
        async function (err, result) {
          if(err){
          res.status(400).json({ message: err });}
        }
      );
      console.log(savedCart);
      res.status(200).json(savedCart);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
  else{
   
      const cart = new Cart({
        user_id: req.user._id,
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
