//We are using common js module not es6 module
const mongoose=require('mongoose');
const express=require('express');
const mongoURI="mongodb://localhost:27017/inotebook"
const connectToMongo=async()=>{
    try{
    mongoose.connect(mongoURI)
        console.log("Connected to Mongos Successfully");
    }catch{
        console.log(error);
    }
}
module.exports=connectToMongo;