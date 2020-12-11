const express = require("express");
const channeltabDB = require("../../../db/channeltab");
const router = express.Router();

router.post("/",(req,res)=>{
    let channelId = req.body[0];
    channeltabDB.findOne({channel:channelId})
        .then(data=>{
            res.send({
                code:1,
                msg:"获取tab成功",
                data:{
                    title:data.title,
                    content:data.list
                }
            })
        })
        .catch(e=>{
            console.log("getChannelTab--error:"+e);
        })
})

module.exports = router;