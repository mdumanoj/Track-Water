const express = require('express');

const db = require('../db/db');

const router = express.Router();

router.post('/', (req, res) => {
    db.insert(req.body)
        .then(resp => {
            let responseObj = {
                code: 'TW_002',
                message: 'Added Successfully'
            }
            res.status(201).json(responseObj);
        });
});

/**
 * Get Can List data by month
 */
router.get('/month/:month', (req, res) => {
    db.find({ selector: { month: +req.params.month } })
        .then(result => {
            let responseObj = {
                code: 'TW_001',
                message: 'success',
                data: result.docs
            }
            res.status(200).json(responseObj);
        }).catch(err => {
            console.error(err);
            let responseObj = {
                code: 'TW_101',
                message: 'Application Error'
            }
            res.status(500).json(responseObj);
        });
});

module.exports = router;