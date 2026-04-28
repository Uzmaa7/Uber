import User from "../models/user.model.js";

const createUser = async ({firstname, lastname, email, password}) => {

    if(!firstname || !email || !password){
        throw new Error("All fields are required")
    }

    const user = await User.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })

    if(!user) throw new Error("Something went wrong while registering user")

    return user;
}

export {createUser};