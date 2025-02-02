const mongoose = require('mongoose');
const config= require("config")

const dbgr = require('debug')('development:mongoose')
//set DEBUG=development:*    //debug messages
//set DEBUG=

mongoose
.connect(`${config.get("MONGODB_URL")}/scratch`)   //dynamic way to handle will se later
.then(function(){
    dbgr("connected");
    
})
.catch(function(err){
    dbgr(err);
    
})

module.exports = mongoose.connect;