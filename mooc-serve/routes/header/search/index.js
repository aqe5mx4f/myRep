const express = require('express');
const router = express.Router();
const lessonDB = require('../../../db/lesson');

router.post('/', (req, res) => {
    console.log(req.body);
    var params = req.body.search.replace(/\s*/g, ""),
        filterObj = {};
    var filterArr = [
        { name: new RegExp('(' + params + ')') },
        { school: new RegExp('(' + params + ')') }
    ];
    if (/^\+?[1-9][0-9]*$/.test(parseInt(params)) || parseInt(params) == 0) {
        filterArr.push({ id: parseInt(params) });
    };
    if (!(req.body.on == 3)) {
        filterObj["courseInfo.state"] = req.body.on;
    };
    if (req.body.gjjp == 1) {
        filterObj.pCategory = "国家精品";
    };
    filterObj.$or = filterArr;
    console.log(filterObj);
    lessonDB.find(filterObj)
        // .select({ name: 1, school: 1, id: 1, _id: 0 })
        .then(data => {
            if (data.length > 0) {
                res.send({
                    code: 1,
                    msg: '获取search结果成功',
                    data: data
                });
            } else {
                res.send({
                    code: 0,
                    msg: '无搜索结果'
                });
            }
        }).catch(e => {
            console.log("routes:header/search--error:");
            console.log(e);
        })
});

module.exports = router;