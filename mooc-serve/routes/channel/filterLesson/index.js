const express = require("express");
const lessonDB = require("../../../db/lesson");
const router = express.Router();

router.post("/", (req, res) => {
    let pChannelId = req.body[0][0],
        sChannelId = req.body[0][1];
    let { state, cate, Pskip, Plimit } = req.body[1], Vardata;
    var Filter = { pChannel: pChannelId };
    if (!sChannelId == 0) { Filter.sChannel = sChannelId };
    console.log(Filter);
    lessonDB.find(Filter)
        .then(data => {
            Vardata = state == 0 ? data : (data.filter(function(item, index) { return item.courseInfo[item.courseInfo.length - 1].state == state }));
            res.send({
                code: 1,
                msg: "获取filterLesson成功",
                data: {
                    total: Vardata.length,
                    pageIndex: Pskip + 1,
                    plimit: Plimit,
                    list: Vardata.slice(Pskip * Plimit, Pskip * Plimit + Plimit)
                }
            });
        })
        .catch(e => {
            console.log("getChannelfilterLesson--error:" + e);
        })
})

module.exports = router;