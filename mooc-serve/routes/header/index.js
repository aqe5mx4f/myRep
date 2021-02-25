const express = require('express');
const router = express.Router();

router.use("/course", require('./course/index'));
router.use("/search", require('./search/index'));
module.exports = router;