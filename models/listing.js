const mongoose = require('mongoose');

const listingschema = new mongoose.Schema({
    title: {
       type: String,
       required:true,
    },
    description:{
        type: String,
     },
    image: {
        type: String,
     },
    price:  {
        type: Number,
     },
    location: {
        type: String,
     },
    country: {
        type: String,
     },
     reviews:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:"Review",
      },
     ],
     owner:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
     }
  });

  const listing=mongoose.model("listing",listingschema);
  module.exports=listing;