const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


//Get all posts
router.get("/", async (req, res) => {
 
	try {
		const products = await Product.find();
		res.json(products);
	} catch (err) {
		res.json({ message: err });
	}
});

//submit a new post
router.post("/", async (req, res) => {
	const product = new Product({
		name: req.body.name,
    description: req.body.description,
		imageUrl: req.body.imageUrl,
		mrp: req.body.mrp,
		price: req.body.price,
		storeName: req.body.storeName,
		link: req.body.link,
		inStock: req.body.inStock,
		fastDelivery: req.body.fastDelivery,
		rating: req.body.rating,
		categories: req.body.categories,
		numberOfRatings: req.body.numberOfRatings,
	});
	try {
		const savedProduct = await product.save();
		res.json(savedProduct);
	} catch (err) {
		res.status(400).json({ message: err });
	}
});


//specific get
router.get("/:productId", async (req, res) => {
	try {
		const products = await Product.findById(req.params.poductId);
		res.json(products);
	} catch (err) {
		res.json({ message: err });
	}
});

//update a product rating
router.patch("/:productId/rating", async (req, res) => {
	try {
		const updatedProduct = await Product.updateOne(
			{ _id: req.params.productId },
			{ $set: { rating: req.body.rating, numberOfRatings: req.body.numberOfRatings } }
		);
		res.json(updatedProduct);
	} catch (err) {
		res.json({ message: err });
	}
});


// const db = require("../productData");
// console.log(db)
// async function populate(obj) {
//   const product = new Product({
// 		name: obj.name,
//     description: obj.description,
// 		imageUrl: obj.imageUrl,
// 		mrp: obj.mrp,
// 		price: obj.price,
// 		storeName: obj.storeName,
// 		link: obj.link,
// 		inStock: obj.inStock,
// 		fastDelivery: obj.fastDelivery,
// 		rating: 0,
// 		categories: obj.categories,
// 		numberOfRatings: 0,
// 	});
// 	try {
// 		// const savedProduct = await product.save();
// 	} catch (err) {
// 		console.log(obj.id)
// 	}
// }
// for(let i = 0; i< db.length; i++){
//   populate(db[i]);
// }


module.exports = router;


