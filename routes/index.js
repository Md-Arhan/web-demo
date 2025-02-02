const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn')
const path = require('path');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

// router.get('/', function(res, req){
//     let error = req.flash('error');
//     res.render('index', {error});
// });

router.get('/shop', isLoggedIn, async function (req, res) {
    res.sendFile(path.join(__dirname, '../views', 'shop.html'));
});

router.get('/addtocart/:product', isLoggedIn, async function (req, res) {
    let user = await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.product)
    await user.save();
    res.redirect('/scratch/shop');
});

router.get('/cart', isLoggedIn, async function (req,res){
    res.sendFile(path.join(__dirname, '../views', 'cart.html'));
});

router.get('/cart_data', isLoggedIn, async function (req, res) {
    
        // Retrieve user and populate the cart with product details
        let user = await userModel
            .findOne({ email: req.user.email })
            .populate("cart");
        
            const uniqueCart = user.cart.reduce((acc, item) => {
                if (!acc.find(cartItem => cartItem._id.toString() === item._id.toString())) {
                    acc.push(item);
                }
                return acc;
            }, []);
    
            res.json(uniqueCart);

});

router.get('/myaccount', isLoggedIn, async function (req,res){
    res.sendFile(path.join(__dirname, '../views', 'myaccount.html'));
});

router.get('/product', async function (req, res) {
    const products = await productModel.find();
    res.json(products);
});

module.exports = router;