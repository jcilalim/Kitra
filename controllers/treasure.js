const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const { MoneyValue, Treasure } = require('../models/index')
const geolib = require('geolib');

// @desc    Get all treasures within the radius of 1 or 10 KM
// @route   GET /api/v1/treasures
// @access  Public
exports.getTreasures = asyncHandler(async (req, res, next) => {

    const { Latitude, Longitude, Distance, prize_value } = req.query;
    
    // Convert Distance from kilometers to meters for geolib
    const radius = Distance * 1000;
 
    const treasures = await Treasure.findAll({
        include: {
            model: MoneyValue,
            required: true,
        },
    });

    if (!treasures || treasures.length <= 0) {
        return next(new ErrorResponse('No treasure found.', 404));
    }

    const nearbyTreasures = treasures.filter(treasure => {

        // Calculate distance between input location and each treasure's coordinates
        const distance = geolib.getDistance(
            { latitude: Latitude, longitude: Longitude },
            { latitude: treasure.Latitude, longitude: treasure.Longitude }
        );

        // Check if the distance is within the specified radius
        const isWithinDistance = distance <= radius;

        // If prize_value is provided, filter by prize_value
        let isWithinPrizeValue = true;
        if (prize_value) {
            isWithinPrizeValue = treasure.MoneyValues.some(moneyValue => {
                return moneyValue.amt >= prize_value && moneyValue.amt <= 30;
            });
        }
        // Return true if both distance and prize value conditions are met
        return isWithinDistance && isWithinPrizeValue;
    }).map(treasure => {
        // Get MoneyValue with the lowest "amt"
        const lowestMoneyValue = treasure.MoneyValues.reduce((min, current) => {
            return current.amt < min.amt ? current : min;
        });
    
        // Return a new treasure object with only the lowest "amt" value
        return {
            ...treasure.toJSON(),
            MoneyValues: [lowestMoneyValue], 
        };
    });;

    if (nearbyTreasures.length === 0) {
        return next(new ErrorResponse('No matching treasures found.', 404));
    }

    // Return the filtered treasures
    res.status(200).json({
        success: true,
        count: nearbyTreasures.length,
        data: nearbyTreasures
    });

   
});


// @desc    Create a treasue with a corresponding money value
// @route   POST /api/v1/treasures
// @access  Public
exports.createTreasureAndMoneyValue = asyncHandler(async (req, res, next) => {

    const { Latitude, Longitude, Name, amt } = req.body;

    const newTreasure = await Treasure.create({ Latitude, Longitude, Name });

    if (!newTreasure) {
        return next(new ErrorResponse('Failed to create treasure.', 400));
    }

    // Create the associated money value entry for the treasure
    const newMoneyValue = await MoneyValue.create({
        treasure_id: newTreasure.Id, 
        amt,
    });

    if (!newMoneyValue) {
        return next(new ErrorResponse('Failed to create treasure', 400));
    }

    res.status(201).json({
        success: true,
        message: 'Treasure and Money Value created successfully',
        treasure: newTreasure,
        moneyValue: newMoneyValue,
    });
    
});