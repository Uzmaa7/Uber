import express from "express";
import { registerValidation } from "../validators/user.Validator.js";
import { register } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validator.middleware.js";

const userRouter = express.Router();

userRouter.post("/register" , registerValidation(), validate,  register);

export default userRouter; 