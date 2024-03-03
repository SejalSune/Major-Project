const express=require("express");
const router=express.Router({mergeParams:true});
const {reviewSchema}=require("../schema.js");
const WrapAsync = require('../utils/wrapAsync.js');
const ExpressError=require("../utils/ExpressError.js");
const ReviewController=require("../controllers/reviews.js");

const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    console.log(error);
    if (error){
      let errMsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errMsg);
    }else {
      next();
    }
};

router.post("/",validateReview,WrapAsync(ReviewController.SubmitReview));

router.delete("/:reviewId", WrapAsync(ReviewController.DestroyReview));
  
module.exports=router;