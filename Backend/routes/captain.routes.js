import express from "express";
import { registerCaptain, loginCaptain, logoutCaptain } from "../controllers/captain.controller.js";
import { registerCaptainValidation, loginCaptainValidation } from "../validators/captain.Validator.js";
import { validate } from "../middlewares/validator.middleware.js";
import {verifyCaptainJWT} from "../middlewares/auth.middleware.js";

const capRouter = express.Router();

capRouter.post("/register", registerCaptainValidation(), validate, registerCaptain);

capRouter.post("/login", loginCaptainValidation(), validate, loginCaptain);

capRouter.post("/logout", verifyCaptainJWT, logoutCaptain);

// capRouter.get("/profile", getCaptainProfile);

export default capRouter;