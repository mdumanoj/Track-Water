const express = require('express');

const db = require('../db/db');

const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body);
    res.json("{ 'success' : 'true' }");
});

router.get('/', (req, res) => {
    res.json("{ 'success' : 'true' }");
});

module.exports = router;