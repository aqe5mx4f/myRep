const express = require('express');
const userDB = require('../../db/user');
const crypto = require('crypto');

let router = express.Router();
router.post('/',(req,res)=>{
    if(req.session.login){
        res.send({
            code : 2,
            msg : "已经登录,请退出之后再登录"
        });
        return;
    }
    let {user,pwd} = req.body;
    userDB.findOne({user})
        .then(data=>{
            if(data){
                //有这个用户
                if(data.pwd === crypto.createHash("sha256").update(pwd).digest("hex")){
                    //写入session
                    req.session.login = data;
                    //返回前端
                    res.send({
                        code : 1,
                        msg :"登录成功",
                        user : data.user,
                        photo : data.photo
                    });
                }else{
                    res.send({
                        code :0,
                        msg : "密码错误"
                    });
                }
            }else{
                //没有这个用户
                res.send({
                    code : 3,
                    msg : "用户不存在"
                })
            }
        })
        .catch(e=>{
            console.log(e);
            res.send({
                code :  4,
                msg : "服务器错误,请稍后再试"
            })
        })
});

//验证是否登录
router.post("/ifLogin",(req,res)=>{
    let data = req.session.login;
    let resData = false;
    if(data){
            delete data.pwd;
            delete data.__V;
            resData = data;
    }
    res.send({
        userInfo : resData
    });
});
//退出登录
router.post('/Logout',(req,res)=>{
    req.session.destroy();
    res.send({
        code :1,
        msg : "退出成功"
    });
});
module.exports = router;
