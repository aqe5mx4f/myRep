const mongoose = require('mongoose');
const crypto = require('crypto');

let userSchema = new mongoose.Schema({
    user: { type: String, required: true },
    pwd: { type: String, required: true },
    regDate: { type: Number, default: Date.now },
    // photo: { type: String, default: "http://localhost:3002/images/user/default.png" },
    photo: { type: String, default: "http://101.34.36.208:3002/images/user/default.png" },
    praisedComment: { type: Array, default: [] },
    enterLesson: [{ type: mongoose.Schema.Types.ObjectId, ref: 'lesson', required: true }]
});

userSchema.pre("save", function(next) {
    //密码加密
    let pwd = this.pwd;
    this.pwd = crypto.createHash("sha256").update(pwd).digest("hex");
    next();
});

module.exports = mongoose.model("user", userSchema);