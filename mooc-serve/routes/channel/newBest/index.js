const express = require("express");
const lessonDB = require("../../../db/lesson");
const router = express.Router();

router.post("/",(req,res)=>{
    let pChannelId = req.body[0],sChannelId = req.body[1];
    lessonDB.find({pChannel:pChannelId,sChannel:sChannelId}).sort({averageHot:-1}).skip(0).limit(10)
        .then(data=>{
            res.send({
                code:1,
                msg:"获取newBest成功",
                data:data
            });
        })
        .catch(e=>{
            console.log("getChannelnewBest--error:"+e);
        })
})

module.exports = router;