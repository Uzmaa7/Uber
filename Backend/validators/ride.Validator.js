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
export {createRideValidator};