const express = require('express');
const router = express.Router();

router.use("/login",require('./login/index'));

//注册相关接口
router.use("/register",require('./register/index'));
router.use("/channel",require('./channel/index'));
router.use("/detail",require('./detail/index'));
module.exports = router;
