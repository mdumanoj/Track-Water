const express = require('express');

const db = require('../db/db');

const router = express.Router();

/**
 * Add can count
 */
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
            if(result.docs.length != 0) {
                result.docs.sort((a,b) => {
                    return new Date(b.date) - new Date(a.date);
                });
            }
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

/**
 * Summary of can count by person
 */
router.get('/summary/month/:month', (req, res) => {
    db.find({ selector: { month: +req.params.month } })
        .then(result => {
            let countMap = new Map([
                ['Ashok',0],
                ['Barath',0],
                ['Manoj',0],
                ['Ranjith',0],
                ['Kaushik',0],
                ['Soma',0],
                ['Velayutham',0],
                ['Water Supplier',0]
            ]);

            // Group by user with count of can
            result.docs.forEach((data => {
                countMap.set(data.by,countMap.get(data.by) + data.count);
            }));

            // Convert Map into Object
            let countObj = [];
            countMap.forEach((val,key) => {
                countObj.push({
                    'name' : key,
                    'count' : val
                });
            });

            // Sort Object
            countObj.sort((a,b) => {
                return b.count - a.count;
            });

            let responseObj = {
                code: 'TW_001',
                message: 'success',
                data: countObj
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