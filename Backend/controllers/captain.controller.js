import Captain from "../models/captain.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import {createCaptain} from "../services/captain.service.js"


const  generateAccessAndRefereshTokens = async (captainId) => {
    try {
        const captain = await Captain.findById(captainId);
        const accessToken = captain.generateAccessToken()
        const refreshToken = captain.generateRefreshToken()

        captain.refreshToken = refreshToken
        await captain.save( { validateBeforeSave: false } )

        return { accessToken,  refreshToken}
        
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}


const registerCaptain = asyncHandler(async(req, res) => {

    const {fullname, email, password, vehicle, contact} = req.body;

    if(!fullname || !email || !password || !vehicle || !contact){
        throw new ApiError(400, "All fields are required")
    }

    const captainExist = await Captain.findOne({email});
    if(captainExist){
        throw new ApiError(400, "Captain already exist")
    }

    const captain = await createCaptain({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password,
        color : vehicle.color,
        plate : vehicle.plate,
        capacity : vehicle.capacity,
        vehicleType : vehicle.vehicleType,
        contact,
    });

    res.status(201).json(new ApiResponse(201, captain , "Captain registered successfully"))
})

const loginCaptain = asyncHandler(async (req, res) => {
    
    const {email, password} = req.body;

    const captain = await Captain.findOne({email}).select("+password");

    if(!captain){
        return res.status(401).json({
            message:"Invalid email or password"
        })
    }

    const isPasswordMatch = await captain.isPasswordMatch(password);
    if(!isPasswordMatch){
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const {accessToken, refreshToken} = await  generateAccessAndRefereshTokens(captain._id);

    const loggedInCaptain = await Captain.findById(captain._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, {captain: loggedInCaptain, accessToken, refreshToken}, "Captain logged in Successfully")
    )


})

const logoutCaptain = asyncHandler(async(req,res) => {
    await Captain.findByIdAndUpdate(
        req.captain._id,
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
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "Captain logged out successfully")
    )
    
})

export {registerCaptain, loginCaptain, logoutCaptain};