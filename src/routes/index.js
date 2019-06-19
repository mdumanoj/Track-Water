const express = require("express");

const router = express.Router();

router.use('/api/track-water',require('./track-water'));

module.exports = router;