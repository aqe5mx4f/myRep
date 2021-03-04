const express = require('express');
const router = express.Router();
const lessonDB = require('../../db/lesson');
const commentDB = require('../../db/comment');

function unique(arr, fval, sval) {
    const res = new Map();
    return arr.filter(item => !res.has(item[fval][sval]) && res.set(item[fval][sval], 1))
}; // "/star 根据结果中的lid-id字段去重"
router.post("/hot", (req, res) => {
    lessonDB.find({}, { courseInfo: { $slice: -1 } })
        .sort({ 'courseInfo.hot': -1 })
        .limit(50)
        .then(data => {
            res.send({
                code: 1,
                msg: '获取成功',
                list: data
            })
        }).catch(e => { console.log(e); });
});
router.post("/new", (req, res) => {
    lessonDB.find({ 'courseInfo.state': 1 })
        .sort({ 'courseInfo.starttime': -1 })
        .limit(20)
        .then(data => {
            res.send({
                code: 1,
                msg: '获取成功',
                list: data
            })
        }).catch(e => { console.log(e); });
});
router.post("/star", (req, res) => {
    commentDB.find({ star: 5 })
        .sort({ admiration: -1 })
        .populate("lid")
        .limit(50)
        .then(data => {
            res.send({
                code: 1,
                msg: '获取成功',
                list: unique(data, 'lid', 'id')
            })
        }).catch(e => { console.log(e); });
});
module.exports = router;