const express = require('express');
const mongoose = require('mongoose');


const mongoConnect = () =>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("MongoDB Connected Successfully")
    })
}

module.exports = mongoConnect;