const express = require('express');
const router = express.Router();
const commentDB =require( '../../../db/comment');

router.post("/",(req,res)=>{
    let params = (decodeURI(decodeURI(req.body.info))).split('&');
    let [name,school,id]=params;
    console.log(name,school,id);
    commentDB.find({lname:name,lschool:school,lid:parseInt(id)})
    .sort({admiration:-1})
    .populate("user",{user:1,photo:1})
        .then(data=>{
            res.send({
                code:1,
                msg:'获取成功',
                data:data
            })
        }).catch(e=>{console.log(e);});
});
router.post("/commitComment",(req,res)=>{
    let params = (decodeURI(decodeURI(req.body.info))).split('&');
    let [name,school,id]=params;
    console.log(name,school,id);
    commentDB.create({
        lname:name,
        lschool:school,
        lid:parseInt(id),
        user:req.session.login._id,
        admiration:admiration,
        content:content,
        star:star,
    }).then(data=>{
        res.send({
            code:1,
            msg:'评价成功'
        })
    }).catch(e=>{console.log(e);});
});
module.exports = router;