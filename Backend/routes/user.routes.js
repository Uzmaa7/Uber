import express from "express";
import { registerValidation, loginValidation } from "../validators/user.Validator.js";
import { register, login, getUserProfile, logout } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/register" , registerValidation(), validate,  register);

userRouter.post("/login", loginValidation(), validate, login);

//secured routes
userRouter.post("/logout", verifyJWT, logout);

userRouter.get("/profile", verifyJWT,  getUserProfile);

export default userRouter; 