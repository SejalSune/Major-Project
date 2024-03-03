const mongoose = require('mongoose');
const Listing=require("../models/listing.js");
const initdata=require("./data.js");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderLust');
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"65dddf2d4e2b439a434a2b4d"}));
    await Listing.insertMany(initdata.data);
    console.log("data was ADDED");
};

initDB();