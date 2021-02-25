const express = require('express');
const userDB = require('../../db/user');
const crypto = require('crypto');

let router = express.Router();
router.post('/', (req, res) => {
    if (req.session.login) {
        res.send({
            code: 2,
            msg: "已经登录,请退出之后再登录"
        });
        return;
    }
    let { user, pwd } = req.body;
    userDB.findOne({ user })
        .then(data => {
            if (data) {
                //有这个用户
                if (data.pwd === crypto.createHash("sha256").update(pwd).digest("hex")) {
                    //写入session
                    req.session.login = data;
                    delete data.pwd;
                    delete data.__V;
                    //返回前端
                    res.send({
                        code: 1,
                        msg: "登录成功",
                        data: data
                    });
                } else {
                    res.send({
                        code: 0,
                        msg: "密码错误"
                    });
                }
            } else {
                //没有这个用户
                res.send({
                    code: 3,
                    msg: "用户不存在"
                })
            }
        })
        .catch(e => {
            console.log(e);
            res.send({
                code: 4,
                msg: "服务器错误,请稍后再试"
            })
        })
});

//重新获取用户信息
router.post("/updateInfo", (req, res) => {
    userDB.findById({ _id: req.body._id }, { pwd: 0 })
        .then(data => {
            res.send({
                code: 1,
                msg: '重新获取用户信息成功',
                Info: data
            })
        }).catch(e => {
            res.send({
                code: 0,
                msg: '服务器错误,清稍后再试'
            });
            console.log("routes-loign-index:/updateInfo--userDB.catch-error:");
            console.log(e);
        });
});
//判断session是否过期并返回用户信息
router.post("/getSession", (req, res) => {
    if (req.session.login) {
        userDB.findById({ _id: req.session.login._id })
            .then(data => {
                delete data.pwd;
                delete data.__v;
                res.send({
                    code: 1,
                    data: data
                })
            }).catch(e => {
                res.send({
                    code: 0,
                    msg: '服务器错误,清稍后再试'
                });
                console.log("routes-loign-index:/updateInfo--userDB.catch-error:");
                console.log(e);
            });
    } else {
        res.send({
            code: 0,
            msg: '近期未登录,请先登录'
        });
    }
});
//退出登录
router.post('/Logout', (req, res) => {
    req.session.destroy();
    res.send({
        code: 1,
        msg: "退出成功"
    });
});
module.exports = router;