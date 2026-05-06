import express from "express";
import {createRideValidator,getFareValidator} from "../validators/ride.Validator.js";
import {validate} from "../middlewares/validator.middleware.js"
import {createRide,getTheFare} from "../controllers/ride.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const rideRouter = express.Router();

rideRouter.post("/create", verifyJWT,createRideValidator(), validate, createRide);

rideRouter.get("/get-fare", verifyJWT,getFareValidator(), validate, getTheFare);

export default rideRouter;6