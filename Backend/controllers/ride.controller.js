import { asyncHandler } from "../utils/asyncHandler.js"
import { createRideService, confirmRideService , startRideService, endRideService} from "../services/ride.service.js";
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

const confirmRide = asyncHandler(async (req, res) => {
    
    

    const {rideId} = req.body
    
    try {
        
        const ride = await confirmRideService({ rideId, captain: req.captain });

        if(!ride){
            return res.status(404).json(new ApiError(404, {}, 'Ride not found or already confirmed'));
        }

        sendMessageToSocketId(ride.user.socketId, {
            event : 'ride-confirmed',
            data : ride
        })

        
        
        return res.status(200).json(new ApiResponse(200, { ride }, 'Ride confirmed successfully'));

    } catch (error) {
        return res.status(500).json(new ApiError(500, 'Server Error While confirming the ride'));
    }
})

const startRide = asyncHandler(async (req, res) => {
    
    const {otp, rideId} = req.query;

    if(!rideId || !otp ){
        throw new ApiError(400, 'RideId and Opt are required');
    }

     try {
        const ride = await startRideService({rideId, otp, captain : req.captain})
        // console.log("in the ride controller" , ride)

        sendMessageToSocketId(ride.user.socketId,
            {
                event : 'ride-started',
                data : ride
            }
        )

        return res.status(200).json(new ApiResponse(200,  {ride : ride}, 'Ride started!! Happy Journey'))

    } catch (error) {
        return res.status(500).json(new ApiError(500, 'Server Error while starting the ride'));
    }
})

const endRide = asyncHandler(async (req, res) => {
    

    const {rideId} = req.body

    try {
        const ride = await endRideService({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event : 'ride-ended',
            data : ride
        })

        return res.status(200).json(new ApiResponse(200,  {ride : ride}, 'Ride Ended'))

    } catch (error) {
        return res.status(500).json(new ApiError(500, 'Server Error while ending the ride'));
    }
})
      

export { createRide, getTheFare, confirmRide, startRide, endRide };