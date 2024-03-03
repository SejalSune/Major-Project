const review=require("../models/reviews.js");
const Listingg=require("../models/listing.js");

module.exports.DestroyReview=async (req, res) => {
    let { id, reviewId } = req.params;
    let Listing = await Listingg.findById(id);
    if (!Listing) {
      req.flash("error", "Listing not found!");
      return res.redirect('/listings');  
    }
    await Listingg.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!!");
    res.redirect(`/listings/${Listing._id}`);
};

module.exports.SubmitReview=async(req,res)=>{
    let Listing=await Listingg.findById(req.params.id);
    let newReview=new review(req.body.review);
    Listing.reviews.push(newReview);
    await newReview.save();
    await Listing.save();
    console.log("done");
    req.flash("success","Review Added!!");
    res.redirect(`/listings/${Listing._id}`);
};