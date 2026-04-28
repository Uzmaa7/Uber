import {body} from "express-validator";

const registerValidation = () => {
    return [
        body("fullname.firstname")
            .trim()
            .isLength({min:3}).withMessage("First name must be at least 3 character"),

        body("fullname.lastname")
            .optional()
            .trim()
            .isLength({min:3}).withMessage("Last name must be at least 3 character"),
        
        body("email")
            .isEmail().withMessage("Invalid Email"),
        
        body("password")
            .isLength({min:6}).withMessage("Password must be atleast 6 character")

    ]
}

export {registerValidation};