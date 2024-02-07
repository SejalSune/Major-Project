const mongoose = require('mongoose');
const express=require("express");
const app=express();
const port=8080;
const methodOverride=require("method-override");
const Listingg=require("./models/listing.js");
const path=require("path");
const ejsMate=require("ejs-mate");
app.engine('ejs', ejsMate);

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

main().catch(err => console.log(err));

//home route
app.get("/",(req,res)=>{
  res.send("Hi its home page");
});

//all list route
app.get("/listings",async(req,res)=>{
  const alllist=await Listingg.find({});
  res.render("home.ejs",{alllist});
});

//new route
app.get("/listings/new",(req,res)=>{
  res.render("new.ejs");
});

app.post("/listings",async (req,res)=>{
  const newlisting=new Listingg(req.body.listing);
  await newlisting.save();
  res.redirect("/listings");
});

//edit
app.get("/listings/:id/edit",async(req,res)=>{
  let {id}=req.params;
  const listing=await Listingg.findById(id);
  res.render("edit.ejs",{listing});
});

//Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listingg.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//delete route
app.delete("/listings/:id",async(req,res)=>{
  let {id}=req.params;
  let Destroy=await Listingg.findByIdAndDelete(id);
  console.log(Destroy);
  res.redirect("/listings");
});

//show route
app.get("/listings/:id",async(req,res)=>{
  let {id}=req.params;
  const listing=await Listingg.findById(id);
  res.render("show.ejs",{listing});
});

app.listen(port,(req,res)=>{
    console.log("listening");
});


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderLust');
}