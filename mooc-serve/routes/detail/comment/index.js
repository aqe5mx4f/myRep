const express = require('express');
const router = express.Router();
const commentDB = require('../../../db/comment');
const userDB = require('../../../db/user');

router.post("/", (req, res) => {
    let { lname, lschool, lid, commentTime } = req.body;
    let filter = { lname: lname, lschool: lschool, lid: parseInt(lid) };
    if (!commentTime == 0) {
        filter.commentTime = parseInt(commentTime);
    };
    commentDB.find(filter)
        .sort({ admiration: -1 })
        .populate("user", { user: 1, photo: 1, praisedComment: 1 })
        .then(data => {
            res.send({
                code: 1,
                msg: '获取成功',
                list: data
            })
        }).catch(e => { console.log(e); });
});
router.post("/commitComment", (req, res) => {
    let { lname, lschool, lid, commentTime, star, content } = req.body;
    console.log(lname, lschool, lid);
    commentDB.create({
        lname: lname,
        lschool: lschool,
        lid: parseInt(lid),
        user: req.session.login._id,
        commentTime: commentTime,
        content: content,
        star: star,
    }).then(data => {
        res.send({
            code: 1,
            msg: '评价成功'
        })
    }).catch(e => { console.log(e); });
});
router.post("/thumbsUp", (req, res) => {
    let { praised, _id, admiration } = req.body;
    if (praised) {
        userDB.findByIdAndUpdate({ _id: req.session.login._id }, {
                $push: {
                    praisedComment: _id
                }
            }).then(data => { console.log("userDB-thumbsUp:Down-success"); })
            .catch(e => { console.log("userDB-thumbsUp-Down-fail:" + e); });
    } else {
        userDB.findByIdAndUpdate({ _id: req.session.login._id }, {
                $pull: {
                    praisedComment: _id
                }
            }).then(data => { console.log("userDB-thumbsUp-Up-success"); })
            .catch(e => { console.log("userDB-thumbsUp-Up-fail:" + e); });
    }
    commentDB.findByIdAndUpdate({ _id: _id }, { $set: { admiration: admiration } })
        .then(data => {
            res.send({
                code: 1,
                msg: '操作成功'
            });
        }).catch(e => {
            res.send({
                code: 1,
                msg: '点赞失败'
            });
        })

})
module.exports = router;