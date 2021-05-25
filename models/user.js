const mongoose = require('mongoose');

const UserSchema=new mongoose.Schema({
username:String,
googleId:String,
expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "expense",
    },
  ],
});

module.exports=mongoose.model('user',UserSchema);
