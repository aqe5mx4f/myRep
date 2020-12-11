var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
//连接数据库
mongoose.connect("mongodb://localhost:27017/mooc",{ useNewUrlParser: true , useUnifiedTopology: true})
    .then(()=>{console.log("数据库连接成功")})
    .catch(()=>{console.log("数据库连接失败")});

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) =>{
    res.header({
        'Access-Control-Allow-Credentials':true,
        'Access-Control-Allow-Origin': req.headers.origin || '*',
        'Access-Control-Allow-Headers':'Content-Type',
        'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type':'application/json;charset=utf-8'
    })
    if(req.method === 'OPTIONS'){
        res.sendStatus(200);
    }else{
        next();
    }
});
app.use((req,res,next) =>{
    if(/^\/(login)/.test(req.url)){
        next();
    }else{
        next();
    }
})
app.use(require('./session/index'));
app.use('/',require('./routes/index'));

module.exports = app;
