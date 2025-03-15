
const ErrorResponse = require('../utils/errorResponse');

module.exports = (req, res, next) => {

    const { Latitude, Longitude, Name, amt  } = req.body;
    
    // Check if Latitude, Longitude, Name, and amt are provided
    if (!Latitude || !Longitude || !Name || !amt) {
        return next(new ErrorResponse('Latitude, Longitude, Name, and amt are required in the data', 400));
    }

    // Convert Latitude, Longitude, and Distance to numbers
    const inputLatitude = parseFloat(Latitude);
    const inputLongitude = parseFloat(Longitude);
    const inputAmt = parseFloat(amt);

    // Check if Latitude, Longitude, and amt are valid numbers
    if (isNaN(inputLatitude) || isNaN(inputLongitude) || isNaN(inputAmt)) {
        return next(new ErrorResponse('Latitude, Longitude, and amt must be valid numbers', 400));
    }

    // Check if Name is a valid string
    if (typeof Name !== 'string' || Name.trim() === '') {
        return next(new ErrorResponse('Name must be a non-empty string', 400));
    }

    // Check if Name is a valid string
    if (inputAmt < 10 || inputAmt > 30) {
        return next(new ErrorResponse('amt must not be lower than 10 and not greater than 30', 400));
    }

    req.body.Latitude = inputLatitude;
    req.body.Longitude = inputLongitude;
    req.body.amt = inputAmt;
   
    next();

}



