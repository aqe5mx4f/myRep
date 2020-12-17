const express = require('express');
const router = express.Router();
const lessonDB =require( '../../../db/lesson');

router.post("/",(req,res)=>{
    let params = (decodeURI(decodeURI(req.body.info))).split('&');
    let [name,school,id]=params;
    console.log(name,school,id);
    lessonDB.find({name:name,school:school,id:parseInt(id)})
        .then(data=>{
            res.send({
                code:1,
                msg:'获取成功',
                data:data
            })
        }).catch(e=>{console.log(e);});
});
module.exports = router;