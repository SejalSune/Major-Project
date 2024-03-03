const express=require("express");
const router=express.Router();
const {listingschema}=require("../schema.js");
const WrapAsync = require('../utils/wrapAsync.js');
const ExpressError=require("../utils/ExpressError.js");
const {isLoggedIn,isOwner}=require("../middleware.js");
// const User=require("../models/user.js");
const ListingController=require("../controllers/listing.js");

const validateSchema=(req,res,next)=>{
    let {error}=listingschema.validate(req.body);
    console.log(error);
    if(result.error){
      throw new ExpressError(400,result.error);
    }else {
      next();
    }
}

router.route("/")
.get(WrapAsync(ListingController.index))
.post(isLoggedIn,WrapAsync(ListingController.newListingAdded));

router.get("/new",isLoggedIn,(ListingController.ListNew));

router.get("/:id/edit",isLoggedIn,isOwner,WrapAsync(ListingController.ListEdit));

router.route("/:id")
.get(WrapAsync(ListingController.ListShow))
.put(isLoggedIn,isOwner, WrapAsync(ListingController.ListUpdate))
.delete(isLoggedIn,isOwner,WrapAsync(ListingController.ListDelete));

router.all("*",(req,res,next)=>{
next(new ExpressError(404,"page not found"));
});

router.use((err, req, res, next) => {
let {status=500,message="something went wrong"}=err;
res.render("error.ejs",{message});
});

module.exports=router;