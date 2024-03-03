const User=require("../models/user.js");

module.exports.SignUPform=(req,res)=>{
    res.render("signup.ejs");
};

module.exports.GiveSignupform=async (req,res)=>{
    try{
        let {username,email,password}=req.body;
        let newUser=new User({username,email});
        const registeredUser=await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser, (error)=> {
            if(error){
                return next(error);
            }
            req.flash("success","Welcome to Travel Thrill");
            res.redirect("/listings");
        })
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.GetLogin=(req,res)=>{
    res.render("login.ejs");
};

module.exports.GiveLogin=async (req, res) => {
    res.redirect(res.locals.redirectUrl);
};

module.exports.Logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err) {
            return next(err);
        }
        req.flash("success","You are Logout");
        res.redirect("/listings");
    });
};


