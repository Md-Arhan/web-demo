const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logout} = require('../controllers/authController');
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'register.html'));
});

// router.get('/get-error', (req,res) => {
//     req.flash('error_msg', 'user already exists')
//     res.redirect('/')
// })

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'login.html'));
});

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logout)

module.exports = router;