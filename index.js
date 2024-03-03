const mongoose = require('mongoose');
const express=require("express");
const app=express();
const port=8080;
const methodOverride=require("method-override");
const path=require("path");
const ejsMate=require("ejs-mate");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local")
const User=require("./models/user.js");

const listingsRouter=require("./route/listing.js");
const reviewsRouter=require("./route/review.js");
const userRouter=require("./route/user.js");

const sessionOptions={
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    expires:Date.now()+7*1000*60*60*24,
    maxAge:7*1000*60*60*24,
    httpOnly:true,
   }
}

app.engine('ejs', ejsMate);

app.use(flash());
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.curruser=req.user;
  next();
});

main().catch(err => console.log(err));

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);

app.listen(port,(req,res)=>{
    console.log("listening");
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderLust');
}