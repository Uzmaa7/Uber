import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getAddressCoordinateService, getDistanceTimeService } from "../services/map.service.js";

const getCoordinates = asyncHandler(async(req, res) => {

    const {address} = req.query

    try {
        const coordinates = await getAddressCoordinateService(address);
        console.log("coordinates are => ", coordinates)

        return res.status(200).json(new ApiResponse(200, { coordinates : coordinates}, 'Co-ordinates fetched successfully' ,));

    } catch (error) {

        res.status(404).json(new ApiError(404, "Co-ordinates not found!"));
    }

})

const getDistanceTime = asyncHandler(async(req, res) => {

    const {origin, destination} = req.query;

    const distanceTime = await getDistanceTimeService(origin, destination);

    return res.status(200).json(new ApiResponse(200, { distanceTime}, 'Distance and Time fetched successfully' ,));
})

export {getCoordinates, getDistanceTime};;