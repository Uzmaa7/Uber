import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});
import express from "express";
import cors from "cors";

// route imports //
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import capRouter from "./routes/captain.routes.js";
import mapRouter from "./routes/map.routes.js";
import rideRouter from "./routes/ride.routes.js";

const app = express();

//middlewares//
// app.use(cors({
//     origin: 'http://localhost:5173', // Wildcard '*' ko hata kar apna frontend URL likhein
//     credentials: true                // Cookies aur headers allow karne ke liye
// }));

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());



app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use("/api/v1/users", userRouter);
app.use("/api/v1/captains", capRouter);
app.use("/api/v1/maps", mapRouter);
app.use("/api/v1/rides", rideRouter);

export default app;