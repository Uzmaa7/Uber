import dotenv from 'dotenv';
dotenv.config({
    path:"./.env"
})
import axios from 'axios'
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAddressCoordinateService = async (address) => {

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        console.log(response.data)

        if (response.data.status === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getDistanceTimeService = async (origin, destination) => {
    if(!origin || !destination){
        throw new ApiError(400, "Origin and Destination are required");
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        
        const response = await axios.get(url);

        if(response.data.status === 'OK') {

            if(response.data.rows[ 0 ].elements[ 0 ].status === "ZERO_RESULTS"){
                throw new ApiError(404, "No route found between the origin and destination");
            };

            return response.data.rows[ 0 ].elements[ 0 ];
        }

        else{
            throw new ApiError(500, "Error occurred while fetching distance and time");
        }
        
        

    } catch (error) {
        throw new ApiError(500, "Error occurred while fetching distance and time");
    }
}

export {getAddressCoordinateService, getDistanceTimeService};