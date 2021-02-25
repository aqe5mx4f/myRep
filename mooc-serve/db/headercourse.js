const mongoose = require('mongoose');

let headercourse = mongoose.model("headercourse", new mongoose.Schema({
    title: { type: String, required: true },
    list: [{
        channel: { type: String, required: true },
        title: { type: String, required: true }
    }]
}));


module.exports = headercourse