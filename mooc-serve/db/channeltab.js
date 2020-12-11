const mongoose = require('mongoose');

let channeltab = mongoose.model("channeltab",new mongoose.Schema({
    channel : {type:Number,required:true},
    title : {type:String,required:true},
    list : {type:Array,require:true}
}));
    

module.exports = channeltab