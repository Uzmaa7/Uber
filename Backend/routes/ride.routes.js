import express from "express";
import {createRideValidator} from "../validators/ride.Validator.js";
import {validate} from "../middlewares/validator.middleware.js"
import {createRide} from "../controllers/ride.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const rideRouter = express.Router();

rideRouter.post("/create", verifyJWT,createRideValidator(), validate, createRide);

export default rideRouter;6