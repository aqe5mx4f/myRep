const express = require('express');
const router = express.Router();
const headercourseDB = require('../../../db/headercourse');

router.post('/', (req, res) => {
    headercourseDB.find({}, { _id: 0, __v: 0 })
        .then(data => {
            res.send({
                code: 1,
                msg: '获取headercourse成功',
                data: data
            })
        }).catch(e => {
            console.log("routes:header/course--error:");
            console.log(e);
        })
});

module.exports = router;