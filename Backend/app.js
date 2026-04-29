import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});
import express from "express";
import cors from "cors";

import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import capRouter from "./routes/captain.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use("/api/v1/users", userRouter);
app.use("/api/v1/captains", capRouter);

export default app;