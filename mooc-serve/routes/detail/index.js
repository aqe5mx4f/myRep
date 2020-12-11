const express = require('express');
const router = express.Router();

router.use("/lesson",require('./lesson'));
module.exports = router;