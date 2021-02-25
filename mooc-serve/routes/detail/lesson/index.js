const express = require('express');
const router = express.Router();
const lessonDB = require('../../../db/lesson');
const userDB = require('../../../db/user');

router.post("/", (req, res) => {
    let params = (decodeURI(decodeURI(req.body.info))).split('&');
    let [name, school, id] = params;
    console.log(name, school, id);
    lessonDB.findOne({ name: name, school: school, id: parseInt(id) })
        .then(data => {
            res.send({
                code: 1,
                msg: '获取成功',
                data: data
            })
        }).catch(e => { console.log(e); });
});

router.post("/joinLess", (req, res) => {
    let joinId = req.body.id;
    let { _id, courseTime, hot } = req.body.lesson;
    userDB.findByIdAndUpdate({ _id: req.session.login._id }, {
        $push: {
            enterLesson: joinId
        }
    }).then(data => {
        lessonDB.updateOne({ _id: _id, 'courseInfo.courseTime': courseTime }, {
            $set: {
                'courseInfo.$.hot': hot + 1
            }
        }).then(Data => {
            res.send({
                code: 1,
                msg: '参加成功'
            });
        }).catch(e => {
            console.log("routes-lesson-index:/joinLess--lessonDB.catch-error:");
            console.log(e)
        })

    }).catch(e => {
        res.send({
            code: 0,
            msg: '服务器错误,清稍后再试'
        });
        console.log("routes-lesson-index:/joinLess-userDB.catch-error:");
        console.log(e);
    });
});
module.exports = router;