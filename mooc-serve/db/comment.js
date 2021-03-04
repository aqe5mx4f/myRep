const mongoose = require('mongoose');

let comment = mongoose.model("comment", new mongoose.Schema({
    lid: { type: mongoose.Schema.Types.ObjectId, ref: "lesson", required: true },
    lname: { type: String, required: true },
    lschool: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    admiration: { type: Number, default: 0 },
    content: { type: String, required: true },
    star: { type: Number, required: true },
    commentTime: { type: Number, required: true },
    date: { type: Number, default: Date.now },
}));
module.exports = comment