import {body, param, query} from "express-validator";

const createRideValidator = () => {
    return[
        // body("userId")
        //     .isString()
        //     .bail()
        //     .isMongoId().withMessage("Invalid userId"),
        body("pickup")
            .isString()
            .isLength({min:3}).withMessage("Pickup location must be at least 3 characters long"),
        body("destination")
            .isString()
            .isLength({min:3}).withMessage("Dropoff location must be at least 3 characters long"),
        body("vehicleType")
            .notEmpty().withMessage("Vehicle type is required")
            .isIn(["auto", "car", "motorcycle"]).withMessage("Vehicle type must be one of auto, car, motorcycle")
    ]
}

const getFareValidator = () => {
    return[
        query('pickup')
            .isString().withMessage('Pickup address must be a string')
            .bail()
            .isLength({ min: 3 }).withMessage('Invalid pickup address'),
        query('destination')
            .isString().withMessage('Destination address must be a string')
            .bail()
            .isLength({ min: 3 }).withMessage('Invalid destination address')
    ]
}

const idValidator = () => {
    return[
        body("rideId")
            .isMongoId().withMessage("Invalid id")
    ]
}

const otpValidator = () => {
    return[
        query("otp")
            .isString().withMessage("OTP must be a string")
            .isLength({min:6, max:6}).withMessage("OTP must be 6 characters long"),
        query("rideId")
            .isMongoId().withMessage("Invalid id")
    ]
}
 export {createRideValidator, getFareValidator, idValidator, otpValidator};