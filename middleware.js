const Listingg=require("./models/listing.js");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must Login");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveredirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner= async (req,res,next)=>{
    let { id } = req.params;
    let list = await Listingg.findById(id);
    if (!list.owner._id.equals(res.locals.curruser._id)) {
      req.flash("error", "You are not the owner of the listing");
      return res.redirect(`/listings/${id}`);
    }
    next();
}
