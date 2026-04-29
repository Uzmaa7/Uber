import express from "express";
import { registerValidation, loginValidation } from "../validators/user.Validator.js";
import { register, login } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validator.middleware.js";

const userRouter = express.Router();

userRouter.post("/register" , registerValidation(), validate,  register);

userRouter.post("/login", loginValidation(), validate, login)

export default userRouter; 