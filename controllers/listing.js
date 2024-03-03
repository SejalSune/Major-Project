const Listingg=require("../models/listing.js");

module.exports.index=async(req,res)=>{
    const alllist=await Listingg.find({});
    res.render("home.ejs",{alllist});
};

module.exports.ListNew=(req,res)=>{
    res.render("new.ejs");
}

module.exports.newListingAdded=async (req,res,next)=>{
    const newlisting=new Listingg(req.body.listing);
    newlisting.owner=req.user._id;
    await newlisting.save();
    req.flash("success","Listing Added!!");
    res.redirect("/listings");
};

module.exports.ListEdit=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listingg.findById(id);
    res.render("edit.ejs",{listing});
};

module.exports.ListUpdate=async (req, res) => {
    await Listingg.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!!");
    res.redirect(`/listings/${id}`);
};

module.exports.ListDelete=async(req,res)=>{
    let {id}=req.params;
    let Destroy=await Listingg.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!!");
    console.log(Destroy);
    res.redirect("/listings");
};

module.exports.ListShow=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listingg.findById(id).populate("reviews").populate("owner");
    res.render("show.ejs",{listing});
};

