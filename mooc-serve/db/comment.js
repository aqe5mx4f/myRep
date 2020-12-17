const mongoose = require('mongoose');

let lesson = mongoose.model("commment",new mongoose.Schema({
    lid:{type:Number,requires:true},
    lname:{type:String,required:true},
    lschool:{type:String,require:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"user",requires:true},
    courseTime:{type:Number,default:1},
    admiration:{type:Number,default:0},
    content:{type:String,required:true},
    star:{type:Number,required:true},
    commentTime:{type:Number,default:1},
    date:{type:Number,default:Date.now},
})); 
module.exports = lesson