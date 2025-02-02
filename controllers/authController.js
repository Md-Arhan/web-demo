const userModel = require('../models/user-model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const path = require('path')
const { generateToken } = require('../utils/generateToken')

module.exports.registerUser = async function (req, res) {
    try {
        let { email, password, fullname } = req.body;

        let user = await userModel.findOne({ email: email });
        if (user) return res.send("account already exits")

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    return res.send(err.message);
                } else {

                    let user = await userModel.create({
                        email,
                        password: hash,        //custom or joybased fxn
                        fullname
                    });
                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.redirect('/scratch/shop');
                }
            })
        })
    } catch (err) {
        res.send(err.message)
    }
}

module.exports.loginUser = async function (req, res) {
    let { email, password} = req.body;

    let user = await userModel.findOne({email: email});
    if(!user) return res.send("email or password incorrect");

    bcrypt.compare(password, user.password, function (err, result){
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect('/scratch/shop');
        }
        else{
            res.send("email is incorrect");
        }
    })

}

module.exports.logout = function (req, res){
    res.cookie('token', '');
    res.redirect('/')
}