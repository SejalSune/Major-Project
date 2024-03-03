const mongoose = require('mongoose');

const Reviewschema = new mongoose.Schema({
    comment: {
       type: String
    },
    rating:  {
        type: Number,
        min:1,
        max:5
     },
     CreatedAt: {
        type:Date,
        default:Date.now()
     }
  });

  module.exports=mongoose.model("Review",Reviewschema);