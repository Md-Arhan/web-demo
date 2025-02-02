const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/product-model')

router.post('/create', upload.single('image'), async function(req, res) {
    // res.send(req.file);
    try{

        let { name, price, discount, bgcolor, panelcolor, textcolor} = req.body;
    
        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price, 
            discount,
            bgcolor,
            panelcolor,
            textcolor
        });

        //  res.send(product);
        // res.flash("success", "product created succesfully");
        res.redirect('/owners/admin')
    }catch(err){
        res.send(err.message);
    }
})

module.exports = router;