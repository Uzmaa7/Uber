import {asyncHandler} from "../utils/asyncHandler.js"
import {createRideService} from "../services/ride.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getFare } from "../services/ride.service.js";

const createRide = asyncHandler(async (req, res) => {

  const { pickup, destination, vehicleType} = req.body;
  const userId = req.user._id; 

  try {
    
    const ride = await createRideService({userId, pickup, destination, vehicleType});

    return res.status(201).json(new ApiResponse(201, {ride}, "Ride created successfully"));

  } catch (error) {
    return res.status(500).json(new ApiResponse(500, {}, error.message));
  }

});


const getTheFare = asyncHandler(async (req, res) => {

   const { pickup, destination } = req.query;

  try {
        const fare = await getFare(pickup, destination);

        return res.status(200).json(new ApiResponse(200, { fare }, "Fare calculated successfully"));

    } catch (err) {

        return res.status(500).json(new ApiResponse(500, {}, err.message));
    }
});

export {createRide, getTheFare};