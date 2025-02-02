const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const expressSession = require('express-session');
const flash = require('connect-flash');

require('dotenv').config();

const db = require('./config/mongoose-connection');
const ownersRouter = require('./routes/ownersRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter');
const indexRouter = require('./routes/index')
 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(
    expressSession({
        resave:false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);
// app.use(flash());
// app.use((req, res, next) => {
//     // res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     next();
// });

app.use(express.static(path.join(__dirname)));

app.use("/scratch", indexRouter)
app.use("/owners", ownersRouter);
app.use("/", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);