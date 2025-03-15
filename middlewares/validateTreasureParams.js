
const ErrorResponse = require('../utils/errorResponse');

module.exports = (req, res, next) => {

    //-------------Latitude, Longitued, and Distance Validator-------------

    const { Latitude, Longitude, Distance, prize_value } = req.query;

    // Check if Latitude, Longitude, and Distance are provided
    if (!Latitude || !Longitude || !Distance) {
        return next(new ErrorResponse('Please provide Latitude, Longitude, and Distance parameters', 400));
    }

    // Convert Latitude, Longitude, and Distance to numbers
    const inputLatitude = parseFloat(Latitude);
    const inputLongitude = parseFloat(Longitude);
    const inputDistance = parseInt(Distance);

     // Validate the input values
     if (isNaN(inputLatitude) || isNaN(inputLongitude) || isNaN(inputDistance)) {
        return next(new ErrorResponse('Latitude, Longitude, and Distance must be valid numbers', 400));
    }

    // Validate Distance it must be 1 or 10 only
    if (inputDistance !== 1 && inputDistance !== 10) {
        return next(new ErrorResponse('Distance must be either 1 or 10 (KM) only', 400));
    }

      //-------------Optional prize_value Validator--------------

      let inputPrizeValue
    if (prize_value) {
        inputPrizeValue = parseInt(prize_value);
        
          // Validate the input values
        if (isNaN(inputPrizeValue)) {
            return next(new ErrorResponse('prize_value must be valid number', 400));
        }
        // Prize value must be between 10 and 30 and a whole number
        if (inputPrizeValue < 10 || inputPrizeValue > 30 || inputPrizeValue % 1 !== 0) {
            return next(new ErrorResponse('prize_value must be a whole number between 10 and 30', 400));
        }
    }

     req.query.Latitude = inputLatitude;
     req.query.Longitude = inputLongitude;
     req.query.Distance = inputDistance;
 
     if (prize_value) {
         req.query.prize_value = inputPrizeValue;
     }
 
     // Continue to route handler
     next();

}



