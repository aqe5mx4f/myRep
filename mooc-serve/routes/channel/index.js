const express = require('express');
const router = express.Router();

router.use("/tab",require('./tab/index'));
router.use("/newBest",require('./newBest/index'));
router.use("/filterLesson",require('./filterLesson/index'));
module.exports = router;

