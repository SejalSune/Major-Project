const mongoose = require('mongoose');

const listingschema = new mongoose.Schema({
    title: {
       type: String,
       required:true
    },
    description:{
        type: String,
        required:true
     },
    image: {
        type: String,
        required:true
     },
    price:  {
        type: Number,
        required:true
     },
    location: {
        type: String,
        required:true
     },
    country: {
        type: String,
        required:true
     },
  });

  const listing=mongoose.model("listing",listingschema);
  module.exports=listing;