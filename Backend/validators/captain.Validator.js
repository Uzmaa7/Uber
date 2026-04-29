import {body} from "express-validator";

const registerCaptainValidation = () => {
    return [
        body("fullName.firstname")
            .trim()
            .isString().withMessage("First name must be a string")
            .isLength({min:3}).withMessage("First name must be at least 3 character"),

        body("fullName.lastname")
            .optional()
            .trim()
            .isString().withMessage("Last name must be a string")
            .isLength({min:3}).withMessage("Last name must be at least 3 character"),

        body("email")
            .isEmail().withMessage("Invalid Email"),

        body("password")
            .isString().withMessage("Password must be a string")
            .isLength({min:6}).withMessage("Password must be atleast 6 character"),

        body("contact")
            .trim()
            .notEmpty().withMessage("Contact number is required")
            .isString().withMessage("Contact must be a string"),

        body("vehicle.color")
            .trim()
            .isString().withMessage("Color must be a string")
            .isLength({min:3}).withMessage("Color must be at least 3 character"),

        body("vehicle.plate")
            .trim()
            .isString().withMessage("Plate must be a string")
            .isLength({min:3}).withMessage("Plate must be at least 3 character"),

        body("vehicle.capacity")
            .isInt({min:1}).withMessage("Capacity must be a number"),
            
        body("vehicle.vehicleType")
            .trim()
            .isString().withMessage("Vehicle type must be a string")
            .isIn(["car", "motorcycle", "auto"]).withMessage('Invalid vehicle type')
    ]        
};

export {registerCaptainValidation};