'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/analytics-controller');

router.post('/used-benefits', controller.postUsedBenefits);
router.post('/devices', controller.postDevices);
router.post('/page-views', controller.postPageViews);
router.post('/sum-used-benefits', controller.postSumUsedBenefits);



module.exports = router;