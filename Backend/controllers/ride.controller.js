import { asyncHandler } from "../utils/asyncHandler.js"
import { createRideService } from "../services/ride.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getFare } from "../services/ride.service.js";
import { getAddressCoordinateService, getCaptainsInTheRadiusService } from "../services/map.service.js";
import { sendMessageToSocketId } from "../socket.js";
import Ride from "../models/ride.model.js";

const createRide = asyncHandler(async (req, res) => {

  const { pickup, destination, vehicleType } = req.body;
  const userId = req.user._id;


  try {

    const ride = await createRideService({ userId, pickup, destination, vehicleType });



    // RESPOND IMMEDIATELY 
    res.status(201).json(new ApiResponse(201, { ride }, "Ride created successfully"));

    // BACKGROUND WORK (non-blocking)
    const pickupCoordinates = await getAddressCoordinateService(pickup);

        const captainsInRadius = await getCaptainsInTheRadiusService(pickupCoordinates.lat, pickupCoordinates.lng, 20);
        console.log("Captains in Radius => ", captainsInRadius);

        

        const rideWithUser = await Ride.findOne({ _id: ride._id }).select("+otp").populate('user');

        console.log("Ride with user details => ", rideWithUser);

        captainsInRadius.map(captain => {

            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })

        })


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

export { createRide, getTheFare };