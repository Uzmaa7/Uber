import User from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js"

const  generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save( { validateBeforeSave: false } )

        return { accessToken,  refreshToken}
        
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

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

const login = asyncHandler(async (req, res) => {
    
    const {email, password} = req.body;

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return res.status(401).json({
            message:"Invalid email or password"
        })
    }

    const isPasswordMatch = await user.isPasswordMatch(password);
    if(!isPasswordMatch){
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const {accessToken, refreshToken} = await  generateAccessAndRefereshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, {user: loggedInUser, accessToken, refreshToken}, "User logged in Successfully")
    )


})

const logout = asyncHandler(async(req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {refreshToken: undefined}
        },
        {
            new: true
        }

    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", accessToken, options)
    .clearCookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, {}, "User logged out successfully")
    )
    
})

const getUserProfile = asyncHandler(async(req, res) => {

})

export {register, login, logout, getUserProfile};