const express = require('express');
const router = express.Router();
const { getTreasures, createTreasureAndMoneyValue } = require('../controllers/treasure');
const validateTreasureParams = require('../middlewares/validateTreasureParams');
const validateTreasureData = require('../middlewares/validateTreasureData');

router.route('/')
    .get(validateTreasureParams, getTreasures)
    .post(validateTreasureData, createTreasureAndMoneyValue);


module.exports = router;