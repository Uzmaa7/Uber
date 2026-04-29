import Captain from "../models/captain.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import {createCaptain} from "../services/captain.service.js"

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

export {registerCaptain};