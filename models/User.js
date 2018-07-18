const mongoose = require('mongoose');

var User=mongoose.model('User',{
  name:{
    type:String,
    required:true
  },
  phone:{
    type:Number,
    required:true,
    unique:true
  }
});

module.exports={User};
