const mongoose = require('mongoose');

const UserSchema=new mongoose.Schema({
username:String,
googleId:String
});

module.exports=mongoose.model('user',UserSchema);
