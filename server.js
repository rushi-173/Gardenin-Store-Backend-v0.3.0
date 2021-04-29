const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const cors = require('cors');


//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//import routes
const productsRoute = require('./routes/products.route');
const cartRoute = require('./routes/cart.route');
const wishlistRoute = require('./routes/wishlist.route');
const authRoute = require('./routes/auth.route');

app.use('/products', productsRoute);
app.use('/wishlist', wishlistRoute);
app.use('/cart', cartRoute);
app.use('/auth', authRoute);

//Routes
app.get('/', (req, res) => {
    res.send("We are on home")
})


//Connect to database
const dbConnect = require("./database/connect");
dbConnect(process.env.DB_URI);

//Listening to the server
const port = process.env.PORT || 8000;
app.listen(port, ()=>console.log(`Server started at http://localhost:${port}/`));


