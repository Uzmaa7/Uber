import {body, query} from "express-validator";

const getCoordinatesValidation = () => {
    return[
        query("address")
            .isString().withMessage("address must be string")
            .bail()
            .isLength({min:3}).withMessage("length must be 3")
    ]
}

const getDistanceTimeValidation = () => {
    return[
        query("origin")
            .isString().withMessage("origin must be string")
            .bail()
            .isLength({min:3}).withMessage("length must be 3"),

        query("destination")
            .isString().withMessage("destination must be string")
            .bail()
            .isLength({min:3}).withMessage("length must be 3")
    ]
}

export {getCoordinatesValidation, getDistanceTimeValidation};