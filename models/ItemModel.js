const mongoose = require('mongoose');

const AddItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
        type:String
    },
    availability:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('MenuItem',AddItemSchema)