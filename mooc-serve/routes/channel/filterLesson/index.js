const express = require("express");
const lessonDB = require("../../../db/lesson");
const router = express.Router();

router.post("/",(req,res)=>{
    let pChannelId = req.body[0][0],sChannelId = req.body[0][1];
    let {state,cate,Pskip,Plimit} = req.body[1];
    var CateToSort=[{},{averageHot:-1},{progress:1}];
    var Filter={pChannel:pChannelId};
    if(!state==0){Filter.state=state};
    if(!sChannelId==0){Filter.sChannel=sChannelId};
    lessonDB.find(Filter).sort(CateToSort[cate])
        .then(data=>{
            res.send({
                code:1,
                msg:"获取filterLesson成功",
                data:{
                    total:data.length,
                    pageIndex:Pskip+1,
                    plimit:Plimit,
                    list:data.slice(Pskip*Plimit,Pskip*Plimit+Plimit)
                }
            });
        })
        .catch(e=>{
            console.log("getChannelfilterLesson--error:"+e);
        })
})

module.exports = router;