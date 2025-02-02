const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
const path = require('path')

if(process.env.NODE_ENV==="development"){
    router.post('/create', async function(req, res) {
        let owners = await ownerModel.find();
        if(owners.length>0){
            return res.send(503)
            .send("YOU DONT HAVE PERMISSION TO CREATE A NEW OWNER");

        }

        let {fullname, email, password} = req.body;

        let createdowner = await ownerModel.create({
            fullname,
            email,
            password,
        })

        res.status(201).send(createdowner)
    })

}

router.get('/admin', function(req, res) {
    // let success = res.flash("success");
    res.sendFile(path.join(__dirname, '../views', 'create-product.html'));
})

// console.log(process.env.NODE_ENV);

module.exports = router;