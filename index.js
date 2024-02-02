const mongoose = require('mongoose');
const express=require("express");
const app=express();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderLust');
}