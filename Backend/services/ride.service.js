import Ride from "../models/ride.model.js"
import {getDistanceTimeService} from "../services/map.service.js";

import bcrypt from "bcrypt";
import crypto from "crypto";
import { ApiError } from "../utils/ApiError.js";

export async function getFare(pickup, destination) {

    if (!pickup || !destination) {
        throw new ApiError(400, 'Pickup and destination are required');
    }

    const distanceTime = await getDistanceTimeService(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };



    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.motorcycle + ((distanceTime.distance.value / 1000) * perKmRate.motorcycle) + ((distanceTime.duration.value / 60) * perMinuteRate.motorcycle))
    };

    return fare;


}

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}


export const createRideService = async ({userId, pickup, destination, vehicleType}) => {

    if (!userId || !pickup || !destination || !vehicleType) {
        throw new ApiError(400, 'All fields are required');
    }

    const fare = await getFare(pickup, destination);

    // console.log("Calculated fare:", fare);

    const ride = await Ride.create({
        user:userId,
        pickup,
        destination,
        fare: fare[vehicleType],
        otp: getOtp(6)
    })

    return ride;
}
