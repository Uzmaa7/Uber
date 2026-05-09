import express from "express";
import {createRideValidator,getFareValidator, idValidator, otpValidator} from "../validators/ride.Validator.js";
import {validate} from "../middlewares/validator.middleware.js"
import {createRide,getTheFare, confirmRide, startRide, endRide} from "../controllers/ride.controller.js";
import {verifyJWT, verifyCaptainJWT} from "../middlewares/auth.middleware.js";

const rideRouter = express.Router();

rideRouter.post("/create", verifyJWT,createRideValidator(), validate, createRide);

rideRouter.get("/get-fare", verifyJWT,getFareValidator(), validate, getTheFare);

rideRouter.post("/confirm-ride", verifyCaptainJWT, idValidator(), validate, confirmRide);

rideRouter.get("/start-ride", verifyCaptainJWT, otpValidator(), validate, startRide);

rideRouter.post("/end-ride", verifyCaptainJWT, idValidator(), validate, endRide);


export default rideRouter;6