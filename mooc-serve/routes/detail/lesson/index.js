const express = require('express');
const router = express.Router();
const lessonDB =require( '../../../db/lesson');

router.post("/",(req,res)=>{
    let params = (decodeURI(decodeURI(req.body.info))).split('&');
    let [name,school,id]=params;
    let filter={};
    if(req.body.allComment==0){
        filter={name:name,school:school,id:parseInt(id)};
    }else{
        filter={name:name,school:school,id:parseInt(id),'courseComment.commentTime':req.body.allComment};
    };console.log(filter);
    lessonDB.find(filter)
        .populate("courseComment.user",{user:1,photo:1,})
        .then(data=>{
            res.send({
                code:1,
                msg:'获取成功',
                data:data
            })
        }).catch(e=>{console.log(e);});
});

router.post("/commitComment",(req,res)=>{
    let {id,star,content}=req.body;
    let {_id,user}=req.session.login;
    console.log(req.session.login);
    var index="222";
    var data={index:11};
    lessonDB.updateOne({id:id},{$push:{'courseComment':{user:_id,content:content,star:star}}})
        .then(data=>{
            res.send({
                code:1,
                msg:'评价成功'
            })
        }).catch(e=>{console.log(e);});
});
module.exports = router;