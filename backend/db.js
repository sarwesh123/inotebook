//We are using common js module not es6 module
const mongoose=require('mongoose');
const express=require('express');
const dotenv=require('dotenv');
const mongoURI=`mongodb+srv://sarwesh123:dqcV6VADFa7ii9Lc@cluster0.g9wghhl.mongodb.net/`


const connectToMongo=async()=>{
    try{
    mongoose.connect(mongoURI)
        console.log("Connected to Mongos Successfully");
    }catch{
        console.log(error);
    }
}
module.exports=connectToMongo;