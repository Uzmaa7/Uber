import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {getCoordinatesValidation, getDistanceTimeValidation, getAutoCompleteSuggestionsValidation} from "../validators/map.Validator.js";
import {validate} from "../middlewares/validator.middleware.js";
import {getCoordinates, getDistanceTime, getAutoCompleteSuggestions} from  "../controllers/map.controller.js";



const mapRouter = express.Router();

mapRouter.get("/get-coordinates", verifyJWT, getCoordinatesValidation(), validate, getCoordinates);

mapRouter.get("/get-distance-time", verifyJWT, getDistanceTimeValidation(), validate, getDistanceTime)

mapRouter.get("/get-suggestions", verifyJWT, getAutoCompleteSuggestionsValidation(), validate,  getAutoCompleteSuggestions);;

export default mapRouter;