import express from "express";
import { registerCaptain } from "../controllers/captain.controller.js";
import { registerCaptainValidation } from "../validators/captain.Validator.js";
import { validate } from "../middlewares/validator.middleware.js";

const capRouter = express.Router();

capRouter.post("/register", registerCaptainValidation(), validate, registerCaptain);

// capRouter.post("/login", loginCaptain);

// capRouter.post("/logout", logoutCaptain);

// capRouter.get("/profile", getCaptainProfile);

export default capRouter;