const express = require("express");
const channeltabDB = require("../../../db/channeltab");
const router = express.Router();

router.post("/", (req, res) => {
    let channelId = req.body[0];
    channeltabDB.find({ show: true }, { _id: 0, __v: 0 })
        .sort({ channel: 1 })
        .then(data => {
            res.send({
                code: 1,
                msg: "获取tab成功",
                data: data
            });
        })
        .catch(e => {
            console.log("routes:channel/all--error:");
            console.log(e);
        })
})

module.exports = router;