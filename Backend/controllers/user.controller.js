import User from "../models/user.model.js";
import { createUser } from "../services/user.service.js";


const register = async (req, res) => {

    const {fullname, email, password} = req.body;

    const userExist = await User.findOne({email});
    if(userExist)throw new Error("User with email or username already exist")

    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password
    })

    res.status(201).json({
        message: "User registered successfully",
        user
    })

}

export {register};