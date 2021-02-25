const express = require('express');
const router = express.Router();

router.use("/lesson", require('./lesson'));
router.use("/comment", require('./comment'));
module.exports = router;