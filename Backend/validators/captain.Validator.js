import {body} from "express-validator";

const registerCaptainValidation = () => {
    return [
        body("fullname.firstname")
            
            .notEmpty().withMessage("First name is required")
            .bail()
            .isString().withMessage("First name must be a string")
            .trim()
            .bail()
            .isLength({min:3}).withMessage("First name must be at least 3 character"),

        body("fullname.lastname")
            .optional()
            
            .isString().withMessage("Last name must be a string")
            .trim()
            .isLength({min:3}).withMessage("Last name must be at least 3 character"),

        body("email")
            .isEmail().withMessage("Invalid Email"),

        body("password")
            .isString().withMessage("Password must be a string")
            .isLength({min:6}).withMessage("Password must be atleast 6 character"),

        body("contact")
            .notEmpty().withMessage("Contact number is required")
            .isString().withMessage("Contact must be a string")
            .trim(),

        body("vehicle.color")
            
            .isString().withMessage("Color must be a string")
            .trim()
            .bail()
            .isLength({min:3}).withMessage("Color must be at least 3 character"),

        body("vehicle.plate")
            
            .isString().withMessage("Plate must be a string")
            .trim()
            .bail()
            .isLength({min:3}).withMessage("Plate must be at least 3 character"),

        body("vehicle.capacity")
            .isInt({min:1}).withMessage("Capacity must be a number"),

        body("vehicle.vehicleType")
            
            .isString().withMessage("Vehicle type must be a string")
            .trim()
            .bail()
            .isIn(["car", "motorcycle", "auto"]).withMessage('Invalid vehicle type')
    ]        
}; 

const loginCaptainValidation = () => {
    return [
        body("email")
            .isEmail().withMessage("Invalid Email"),

        body("password")
            .isString().withMessage("Password must be a string")
            .bail()
            .isLength({min:6}).withMessage("Password must be atleast 6 character")
    ]
};


export {registerCaptainValidation, loginCaptainValidation};