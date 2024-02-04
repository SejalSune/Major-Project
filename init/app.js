const mongoose = require('mongoose');
const Listing=require("../models/listing.js");
const initdata=require("./data.js");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderLust');
}

const initDB=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("data was ADDED");
};

initDB();